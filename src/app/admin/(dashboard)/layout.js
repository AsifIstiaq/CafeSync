import AdminNavbar from "@/components/AdminNavbar";
import AdminFooter from "@/components/AdminFooter";

export default function AdminLayout({ children }) {
  return (
    <>
      <AdminNavbar />

      <main className="min-h-screen bg-gray-50">{children}</main>

      <AdminFooter />
    </>
  );
}
