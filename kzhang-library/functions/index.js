/* eslint-env node */
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");

const { onDocumentWritten } = require("firebase-functions/v2/firestore");

const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();


// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.capitalizeBook = onDocumentWritten("books/{docId}", async (event) => {
    const afterSnap = event.data && event.data.after;
    if (!afterSnap) return;

    const data = afterSnap.data() || {};
    if (data._normalized === true) return;

    const updated = {};
    Object.keys(data).forEach((k) => {
        const v = data[k];
        updated[k] = (typeof v === "string") ? v.toUpperCase() : v;
    });
    updated._normalized = true;

    await afterSnap.ref.update(updated);
});

exports.countBooks = onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            const booksCollection = admin.firestore().collection("books");
            const snapshot = await booksCollection.get();
            const count = snapshot.size;

            logger.info("Counted books", { count });
            res.status(200).send({ count });
        } catch (error) {
            logger.error("Error counting books", { message: error.message });
            res.status(500).send("Error counting books");
        }
    });
});

// GET /getAllBooks - return all books documents as JSON array
exports.getAllBooks = onRequest({ region: "us-central1" }, (req, res) => {
    cors(req, res, async () => {
        try {
            const snapshot = await admin.firestore().collection("books").get();
            const books = [];
            snapshot.forEach((doc) => {
                books.push({ id: doc.id, ...doc.data() });
            });
            res.status(200).json(books);
        } catch (error) {
            logger.error("Error getting all books", { message: error.message });
            res.status(500).send("Error getting all books");
        }
    });
});

