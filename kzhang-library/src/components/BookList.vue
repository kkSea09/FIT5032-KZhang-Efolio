<template>
    <div class="container mt-4">
        <h1 class="text-center mb-3">Books</h1>

        <!-- Simple query buttons: where / orderBy / limit -->
        <div class="d-flex justify-content-center gap-2 mb-3">
            <button class="btn btn-outline-primary btn-sm" @click="fetchWhere">Where: isbn &gt; 1000</button>
            <button class="btn btn-outline-secondary btn-sm" @click="fetchOrderBy">Order By: name asc</button>
            <button class="btn btn-outline-success btn-sm" @click="fetchLimit">Limit: 3</button>
        </div>

        <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center" v-for="book in books"
                :key="book.id">
                <div>
                    <span class="fw-semibold">{{ book.name }}</span>
                    <span class="text-muted"> - ISBN: {{ book.isbn }}</span>
                </div>
                <div>
                    <button class="btn btn-sm btn-primary me-2" @click="updateBook(book.id, book.name)">Edit</button>
                    <button class="btn btn-sm btn-danger" @click="deleteBook(book.id)">Delete</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db } from '@/firebase/init';
import { collection, query, where, getDocs, orderBy, limit, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const books = ref([]);

//  where 
const fetchBooks = async () => {
    try {
        const q = query(collection(db, 'books'), where('isbn', '>', 1000));
        const querySnapshot = await getDocs(q);
        const booksArray = [];
        querySnapshot.forEach((doc) => {
            booksArray.push({ id: doc.id, ...doc.data() });
        });
        books.value = booksArray;
    } catch (error) {
        console.error('Error fetching books: ', error);
    }
};

// Order by isbn ascending
const fetchOrderBy = async () => {
    try {
        const q = query(collection(db, 'books'), orderBy('name', 'asc'));
        const snap = await getDocs(q);
        const arr = [];
        snap.forEach(d => arr.push({ id: d.id, ...d.data() }));
        books.value = arr;
    } catch (e) {
        console.error(e);
    }
};

// Limit to 3 items
const fetchLimit = async () => {
    try {
        const q = query(collection(db, 'books'), limit(3));
        const snap = await getDocs(q);
        const arr = [];
        snap.forEach(d => arr.push({ id: d.id, ...d.data() }));
        books.value = arr;
    } catch (e) {
        console.error(e);
    }
};

// for clearer button naming
const fetchWhere = () => fetchBooks();

// update book
const updateBook = async (id, currentName) => {
    const newName = window.prompt('New name:', currentName || '');
    if (!newName || newName === currentName) return;
    try {
        await updateDoc(doc(db, 'books', id), { name: newName });
        // Refresh current view (use default where for simplicity)
        await fetchBooks();
        alert('Updated');
    } catch (e) {
        alert('Update error: ' + e);
    }
};

// delete book
const deleteBook = async (id) => {
    if (!window.confirm('Delete this book?')) return;
    try {
        await deleteDoc(doc(db, 'books', id));
        await fetchBooks();
        alert('Deleted');
    } catch (e) {
        alert('Delete error: ' + e);
    }
};

onMounted(() => {
    fetchBooks();
});


</script>