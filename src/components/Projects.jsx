import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const WORKS_COLL = "works";

export default function Projects({ isAdmin }) {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    type: "image",
    description: "",
    url: "",
    category: "art",
  });

  useEffect(() => {
const q = query(collection(db, WORKS_COLL), orderBy("order", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setWorks(list);addDoc
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const resetForm = () =>
    setForm({ title: "", type: "image", description: "", url: "", category: "art" });

  const toEmbed = (link) => {
    try {
      const u = new URL(link);
      if (u.hostname.includes("youtube.com") && u.searchParams.get("v")) {
        return `https://www.youtube.com/embed/${u.searchParams.get("v")}`;
      }
      if (u.hostname === "youtu.be") {
        return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
      }
      if (u.hostname.includes("drive.google.com")) {
        const fileIdMatch = link.match(/\/d\/(.+?)\//);
        if (fileIdMatch) return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
        return link;
      }
      return link;
    } catch {
      return link;
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.url) return alert("Please provide a URL.");
    try {
      const url = toEmbed(form.url);
      await addDoc(collection(db, WORKS_COLL), {
  title: form.title,
  type: form.type,
  description: form.description,
  url,
  category: form.category,
  order: works.length, // NEW: assign last position
  createdAt: serverTimestamp()
});

      resetForm();
      alert("Created!");
    } catch (err) {
      console.error(err);
      alert("Create failed. Check console.");
    }
  };

  const handleUpdate = async (id, fields) => {
    await updateDoc(doc(db, WORKS_COLL, id), fields);
  };

  const handleDelete = async (item) => {
    if (!confirm("Delete this work?")) return;
    try {
      await deleteDoc(doc(db, WORKS_COLL, item.id));
    } catch (err) {
      console.error(err);
      alert("Delete failed.");
    }
  };

 const handleDragEnd = async (result) => {
  if (!result.destination) return;

  const items = Array.from(works);
  const [reordered] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, reordered);

  setWorks(items);

  // Save new order to Firestore
  try {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      await updateDoc(doc(db, WORKS_COLL, item.id), { order: i });
    }
  } catch (err) {
    console.error("Failed to save order:", err);
    alert("Failed to save new order.");
  }
};


  return (
    <div className="section">
      <div className="section-head">
        <h2 className="section-title">Projects</h2>
        {isAdmin && <span className="badge">Admin mode</span>}
      </div>

      {isAdmin && (
        <form className="card admin-form" onSubmit={handleCreate}>
          <h3>Add New Work</h3>
          <label htmlFor="title">
            Title
            <input
              id="title"
              name="title"
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="e.g., Anime Sketch #2"
            />
          </label>

          <label htmlFor="type">
            Type
            <select
              id="type"
              name="type"
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
            >
              <option value="image">Image (Google Drive)</option>
              <option value="video">Video (embed link)</option>
            </select>
          </label>

          <label htmlFor="url">
            {form.type === "image"
              ? "Google Drive Image Link"
              : "Video Link (YouTube/Vimeo/Drive)"}
            <input
              id="url"
              name="url"
              value={form.url || ""}
              onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
              placeholder={
                form.type === "image"
                  ? "https://drive.google.com/file/d/FILE_ID/view?usp=sharing"
                  : "https://youtube.com/watch?v=..."
              }
              required
            />
          </label>

          <label htmlFor="description">
            Description
            <textarea
              id="description"
              name="description"
              rows="3"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="What’s this work about?"
            />
          </label>

          <button className="btn" type="submit">
            Add Work
          </button>
        </form>
      )}

      {loading ? (
        <p>Loading…</p>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="worksGrid" direction="horizontal">
            {(provided) => (
              <div className="grid" {...provided.droppableProps} ref={provided.innerRef}>
                {works.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={index}
                    isDragDisabled={!isAdmin}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`card work ${!isAdmin ? "pangea" : ""}`}
                      >
                        <WorkCard
                          item={item}
                          isAdmin={isAdmin}
                          onUpdate={handleUpdate}
                          onDelete={() => handleDelete(item)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
}

function WorkCard({ item, isAdmin, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({
    title: item.title,
    description: item.description,
    url: item.url,
  });

  const save = async () => {
    await onUpdate(item.id, { title: draft.title, description: draft.description, url: draft.url });
    setEditing(false);
  };

  return (
    <div>
      <h4 className="work-title">{item.title}</h4>
      <div className="work-media">
        {item.type === "image" ? (
          <iframe src={item.url} width="100%" height="auto" frameBorder="0" allow="autoplay" />
        ) : (
          <div className="video-wrap">
            <iframe
              src={item.url}
              title={item.title}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </div>
      <p className="work-desc">{item.description}</p>

      {isAdmin && (
        <div className="work-admin">
          {!editing ? (
            <>
              <button className="btn ghost" onClick={() => setEditing(true)}>
                Edit
              </button>
              <button className="btn danger" onClick={onDelete}>
                Delete
              </button>
            </>
          ) : (
            <div className="edit-form">
              <input
                value={draft.title}
                onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
              />
              <textarea
                rows="3"
                value={draft.description}
                onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
              />
              {item.type === "video" && (
                <input
                  value={draft.url}
                  onChange={(e) => setDraft((d) => ({ ...d, url: e.target.value }))}
                  placeholder="https://www.youtube.com/embed/..."
                />
              )}
              <div className="edit-actions">
                <button className="btn" onClick={save}>
                  Save
                </button>
                <button
                  className="btn ghost"
                  onClick={() => {
                    setEditing(false);
                    setDraft({ title: item.title, description: item.description, url: item.url });
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
