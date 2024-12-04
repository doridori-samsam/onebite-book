import React, { ReactNode, useEffect, useState } from "react";
import SearchableLayout from "@/components/searchable-layout";
import BookItem from "@/components/book-item";
import fetchBooks from "@/lib/fetch-books";
import { GetServerSidePropsContext, GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { BookData } from "@/types";

// export const getStaticProps = async (
//   context: GetStaticPropsContext
// ) => {
//   const q = context.query.q; //사전 정적 페이지에서 query를 가져올 수 없음...
//   const books = await fetchBooks(q as string);
//
//   return {
//     props: {
//       books,
//     },
//   };
// };


function Page() {
  const router = useRouter()
  const q = router.query.q;

  const [books, setBooks] = useState<BookData[]>([]);

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  }

  useEffect(() => {
    if(q)[
        fetchSearchResult()
    ]
  }, [q]);
  
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default Page;

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
