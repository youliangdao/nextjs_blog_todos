import Layout from "../components/Layout";
import Auth from "../components/Auth";

export default function Home() {
  return (
    <Layout title="Login">
      <Auth>
        <p className="text-4xl">Welcome to Nextjs</p>
      </Auth>
    </Layout>
  );
}
