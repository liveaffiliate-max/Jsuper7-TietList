"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {

  const router = useRouter();

  useEffect(() => {

    const admin = localStorage.getItem("admin");

    if (!admin) {
      router.push("/admin");
    }

  }, []);

  const logout = () => {

    localStorage.removeItem("admin");
    router.push("/admin");

  };

  return (
    <div style={styles.container}>

      <h1 style={styles.title}>Admin Dashboard</h1>

      <div style={styles.grid}>

        <div style={styles.card} onClick={() => router.push("/admin/clips")}>
          <h3>🎬 ตรวจคลิป</h3>
          <p>ดูคลิปที่ user ส่งเข้ามา</p>
        </div>

        <div style={styles.card} onClick={() => router.push("/admin/all-clips")}>
          <h3>📂 คลิปทั้งหมด</h3>
          <p>ดูคลิปทั้งหมดในระบบ</p>
        </div>

        <div style={styles.card} onClick={() => router.push("/admin/users")}>
          <h3>👤 ผู้ใช้</h3>
          <p>ดูข้อมูล user ทั้งหมด</p>
        </div>

        <div style={styles.card} onClick={() => router.push("/")}>
          <h3>🌐 หน้าเว็บหลัก</h3>
          <p>กลับไปหน้า user</p>
        </div>

      </div>

      <button onClick={logout} style={styles.logout}>
        Logout
      </button>

    </div>
  );
}

const styles = {

  container: {
    maxWidth: "900px",
    margin: "60px auto",
    padding: "20px",
    fontFamily: "sans-serif"
  },

  title: {
    textAlign: "center",
    marginBottom: "40px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px"
  },

  card: {
    background: "white",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    cursor: "pointer"
  },

  logout: {
    marginTop: "30px",
    padding: "10px 20px",
    background: "#ff4d4f",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }

};