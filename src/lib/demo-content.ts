import savanna from "@/assets/demo-savanna.jpg";
import character from "@/assets/demo-character.jpg";
import city from "@/assets/demo-city.jpg";
import abstract from "@/assets/demo-abstract.jpg";
import landscape from "@/assets/demo-landscape.jpg";
import anime from "@/assets/demo-anime.jpg";
import hero from "@/assets/hero.jpg";

export const demoAssets = { savanna, character, city, abstract, landscape, anime, hero };

export interface DemoItem {
  id: string;
  title: string;
  creator: string;
  kind: "video" | "image" | "audio";
  src: string;
  likes: number;
  createdAt: string;
  tall?: boolean;
}

export const demoGallery: DemoItem[] = [
  {
    id: "1",
    title: "Savanna sunrise drone pass",
    creator: "@amaka",
    kind: "video",
    src: savanna,
    likes: 1284,
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    title: "Neon courier, night district",
    creator: "@kojo",
    kind: "image",
    src: character,
    likes: 942,
    createdAt: "5 hours ago",
    tall: true,
  },
  {
    id: "3",
    title: "Rain over the tower district",
    creator: "@lin",
    kind: "video",
    src: city,
    likes: 2310,
    createdAt: "yesterday",
  },
  {
    id: "4",
    title: "Liquid chrome study",
    creator: "@studio_ora",
    kind: "image",
    src: abstract,
    likes: 620,
    createdAt: "yesterday",
  },
  {
    id: "5",
    title: "Cloud sea at dawn",
    creator: "@mateo",
    kind: "video",
    src: landscape,
    likes: 1770,
    createdAt: "2 days ago",
  },
  {
    id: "6",
    title: "Field of lights",
    creator: "@yuki",
    kind: "image",
    src: anime,
    likes: 3105,
    createdAt: "3 days ago",
    tall: true,
  },
  {
    id: "7",
    title: "Signal bloom",
    creator: "@gen12",
    kind: "image",
    src: hero,
    likes: 880,
    createdAt: "4 days ago",
  },
];

const pick = (i: number) => demoGallery[i] as DemoItem;

export const demoCreations: DemoItem[] = [
  { ...pick(0), creator: "You", createdAt: "Today" },
  { ...pick(3), creator: "You", createdAt: "Today" },
  { ...pick(4), creator: "You", createdAt: "Yesterday" },
  {
    id: "a1",
    title: "Narration — savanna documentary",
    creator: "You",
    kind: "audio",
    src: landscape,
    likes: 0,
    createdAt: "Yesterday",
  },
];
