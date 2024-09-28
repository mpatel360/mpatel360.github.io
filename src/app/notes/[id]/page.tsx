import styles from "../Notes.module.css";
import { getNotes } from "../page";

async function getNote(noteId: string) {
  const result = await fetch(
    `http://127.0.0.1:8090/api/collections/notes/records/${noteId}`,
    { next: { revalidate: 10 } } // regenerate the page on the server if it's older than a certain number of seconds
  );
  const data = await result.json();
  return data as any;
}

export default async function NotePage({ params }: any) {
  console.log(params);
  const { title, content, created } = await getNote(params.id);
  return (
    <div>
      <h1>{title}</h1>
      <div className={styles.note}>
        <h5>{content}</h5>
        <h5>{created}</h5>
      </div>
    </div>
  );
}

// // This function gets called at build time on server-side.
// // It won't be called on client-side, so you can even do
// // direct database queries.
// export async function generateStaticParams() {
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   const notes = await getNotes();

//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       notes,
//     },
//   };
// }
