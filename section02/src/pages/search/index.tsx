import {ReactNode} from "react";
import book from "@/mock/books.json";
import SearchableLayout from "@/components/searchable-layout";
import BookItem from "@/components/book-item";

function Page() {
    return (
        <div>
            {book.map((book) => <BookItem key={book.id} {...book}/>)}
        </div>
    )
}

export default Page;

Page.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
}