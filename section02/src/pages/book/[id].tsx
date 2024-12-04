import { GetServerSidePropsContext, GetStaticPropsContext, InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import styles from "./[id].module.css";
import fetchOneBook from "@/lib/fetch-one-book";


const mockData = {
    "id": 7,
    "title": "이펙티브 타입스크립트",
    "subTitle": "동작 원리의 이해와 구체적인 조언 62가지",
    "description": "타입스크립트는 타입 정보를 지닌 자바스크립트의 상위 집합으로, 자바스크립트의 골치 아픈 문제점들을 해결해 준다. 이 책은 《이펙티브 C++》와 《이펙티브 자바》의 형식을 차용해 타입스크립트의 동작 원리, 해야 할 것과 하지 말아야 할 것에 대한 구체적인 조언을 62가지 항목으로 나누어 담았다.\n각 항목의 조언을 실제로 적용한 예제를 통해 연습하다 보면 타입스크립트를 효율적으로 사용하는 방법을 익힐 수 있다. 타입스크립트를 기초적인 수준에서만 활용했다면 이 책을 통해 타입스크립트 전문가로 거듭나 보자.\n\n이 책에서 다루는 내용\nㆍ 타입스크립트의 타입 시스템에 대한 자세한 이해\nㆍ 안전하고 명료한 코드를 작성할 수 있는 타입 설계\nㆍ 최소한의 타입 구문으로 완전한 안전성을 얻을 수 있는 타입 추론\nㆍ any 타입의 전략적 사용\nㆍ 의존성과 타입 선언 파일이 동작하는 원리\nㆍ 자바스크립트를 타입스크립트로 마이그레이션하는 방법",
    "author": "댄 밴더캄",
    "publisher": "인사이트",
    "coverImgUrl": "https://shopping-phinf.pstatic.net/main_3247334/32473346832.20221227204218.jpg"
};

export const getStaticPaths = () => {
    return {
        paths: [
            {params: { id: "1"}},
            {params: {id: "2"}},
            {params: {id: "3"}}
        ],
        fallback: "blocking"
    }
}


export const getStaticProps = async (context: GetStaticPropsContext) => {

    const id = context.params!.id;
    const book = await fetchOneBook(Number(id));

    return {
        props: {
            book,
        }
    }
}


function Page({book}: InferGetStaticPropsType<typeof getStaticProps>) {

    if(!book) return "문제가 발생했습니다. 다시 시도해 주세요."
    const {id, title, subTitle, description, author, publisher, coverImgUrl} = book;

    return (
        <div className={styles.container}>
            <div className={styles.cover_img_container} style={{backgroundImage: `url(${coverImgUrl})`}}>
                <img src={coverImgUrl} alt=""/>
            </div>
            <div className={styles.title}>{title}</div>
            <div className={styles.subTitle}>{subTitle}</div>
            <div className={styles.author}>{author} | {publisher}</div>
            <div className={styles.description}>{description}</div>
        </div>
    )
}

export default Page;
