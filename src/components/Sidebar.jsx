"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
function Sidebar() {
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Empleados",
      link: "/employees",
      active: false,
      icon: "group",
    },
    {
      id: 2,
      name: "Equipos",
      link: "/equipment",
      active: false,
      icon: "devices",
    },
    {
      id: 3,
      name: "Mantenimientos",
      link: "/maintenance",
      active: false,
      icon: "construction",
    },
    {
      id: 4,
      name: "Asignación",
      link: "/assignment",
      active: false,
      icon: "gesture_select",
    },
    {
      id: 5,
      name: "Historial",
      link: "/history",
      active: false,
      icon: "history",
    },
  ]);

  const [newMenu, setNewMenu] = useState(menuItems);
  const pathname = usePathname();

  useEffect(() => {
    const itemPath = menuItems.find((item) => item.link === pathname);
    if (itemPath) {
      const updatedMenu = menuItems.map((item) =>
        item.link === pathname
          ? {
              ...item,
              active: !item.active,
            }
          : item
      );
      setNewMenu(updatedMenu);
    } else {
      setNewMenu(menuItems);
    }
  }, [pathname, menuItems]);

  return (
    <aside className="min-h-screen w-96 bg-slate-900 text-white p-4 flex flex-col justify-between">
      <h1 className="text-4xl m-8 font-bold">
        <Link href={"/"}>Inventarios</Link>
      </h1>
      <ul className="h-96 flex flex-col justify-between m-4 mb-auto">
        {newMenu.map((item) => (
          <Link href={item.link} key={item.id}>
            <li
              className={`${
                item.active ? "bg-white text-black" : ""
              } hover:bg-white hover:text-black p-4 rounded-md flex gap-5 items-center`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.name}
            </li>
          </Link>
        ))}
      </ul>
      <button className="m-4 p-4 hover:bg-white hover:text-black rounded-md text-start flex items-center gap-5">
        <span className="material-symbols-outlined">logout</span>
        Salir
      </button>
    </aside>
  );
}

export default Sidebar;
