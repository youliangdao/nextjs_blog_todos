import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Link from "next/link";
import { getAllTaskIds, getTaskData } from "../../lib/tasks";
import useSWR from "swr";
import { useEffect } from "react";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Task({ id, staticTask }) {
  const router = useRouter();
  const { data: task, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${id}`,
    fetcher,
    {
      fallbackData: staticTask,
    }
  );

  useEffect(() => {
    mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (router.isFallback || !task) {
    return <div>Loading...</div>;
  }
  return (
    <Layout title={task.title}>
      <p className="m-4">
        {"ID : "}
        {task.id}
      </p>
      <p className="mb-4 text-xl font-bold">{task.title}</p>
      <p className="mb-12">{task.created_at}</p>
      <Link href="/task-page">
        <div className="flex cursor-pointer mt-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
            />
          </svg>
          <span>Back to task-page</span>
        </div>
      </Link>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await getAllTaskIds();
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const staticTask = await getTaskData(params.id);
  return {
    props: {
      id: staticTask.id,
      staticTask,
    },
    revalidate: 3,
  };
}
