export interface TechItem {
    name: string;
}

export interface TechStack {
    frontend: TechItem[];
    backend: TechItem[];
    tools: TechItem[];
}

export const stack: TechStack = {
    frontend: [
        { name: "React" },
        { name: "Next.js" },
        { name: "TypeScript" },
        { name: "Tailwind CSS" },
        { name: "Nuxt" },
        { name: "Vue" },
    ],
    backend: [
        { name: "Node.js" },
        { name: "PostgreSQL" },
        { name: "MySQL" },
        { name: "Laravel" },
    ],
    tools: [
        { name: "Git" },
        { name: "Docker" },
        { name: "Cursor" },
        { name: "Chrome DevTools" },
    ],
};
