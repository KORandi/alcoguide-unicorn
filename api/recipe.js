const host = process.env.HOST || "";

export async function getAllNotes() {
    const res = await fetch(`${host}/api/notes`);
    const { data } = await res.json();
    return data;
}

export async function getNote(id) {
    const res = await fetch(`${host}/api/notes/${id}`);
    const { data } = await res.json();
    return data;
}

export async function deleteNote(id) {
    return await fetch(`${host}/api/notes/${noteId}`, {
        method: "DELETE"
    });
}