export interface Project {
    id: string;
    image: string;
    demoUrl: string;
}

export const projects: Project[] = [
    {
        id: "arimono",
        image: "/images/arimono.app.webp",
        demoUrl: "https://arimono.app",
    },
    {
        id: "yourrich",
        image: "/images/yourrich.co.jp.webp",
        demoUrl: "https://yourrich.co.jp",
    },
    {
        id: "eitai-tech",
        image: "/images/eitai-tech.com.webp",
        demoUrl: "https://eitai-tech.com",
    },
    {
        id: "posse",
        image: "/images/posse-p.jp.webp",
        demoUrl: "http://posse-p.jp",
    },
];
