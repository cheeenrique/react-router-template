import { Outlet } from "react-router";
import { Layout } from "../components/feature/Layout";

export default function AppLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
} 