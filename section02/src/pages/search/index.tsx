import { useRouter } from "next/router";

function Page() {
  const router = useRouter();
  const { q } = router.query;

  return <h1>Search {q}</h1>;
}

export default Page;
