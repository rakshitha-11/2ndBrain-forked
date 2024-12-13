import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { IconArrowWaveRightUp, IconBoxAlignRightFilled, IconBoxAlignTopLeft, IconClipboardCopy, IconFileBroken, IconSignature, IconTableColumn } from "@tabler/icons-react";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { useRouter } from "next/navigation";

// Dummy data for BentoGrid items
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const items = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Power of Communication",
    description: "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    header: <Skeleton />,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life.",
    header: <Skeleton />,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: <Skeleton />,
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
];

const HomePage = () => {
  const router = useRouter();
  const forwardToUserBrain = () => {
    router.push('/userBrain');
  };
    const people = [
        {
          id: 1,
          name: "John Doe",
          designation: "Software Engineer",
          image:
            "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
        },
        {
          id: 2,
          name: "Robert Johnson",
          designation: "Product Manager",
          image:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        },
        {
          id: 3,
          name: "Jane Smith",
          designation: "Data Scientist",
          image:
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        },
        {
          id: 4,
          name: "Emily Davis",
          designation: "UX Designer",
          image:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        },
        {
          id: 5,
          name: "Tyler Durden",
          designation: "Soap Developer",
          image:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
        },
        {
          id: 6,
          name: "Dora",
          designation: "The Explorer",
          image:
            "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
        },
      ];

  return (
    <div className="w-full">
      <div className="relative flex flex-col items-center justify-end h-[60vh]">
        <div className="text-center max-w-xl space-y-6 tracking-wider">
          <div className="text-5xl font-bold">
            Get Your Life Organized with Second Brain
          </div>
          <div className="text-xl text-gray-600">
            Second Brain is an all-in-one Notion system that tracks your goals, projects, notes, and everything in between.
          </div>
          <div>
            <button onClick={e=>forwardToUserBrain()} className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex tracking-widest h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Get Second Brain
              </span>
            </button>
          </div>
          <div className="flex flex-row items-center justify-center mb-10 w-full">
            <AnimatedTooltip items={people} />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <img className="m-5 h-[60vh]" src="https://framerusercontent.com/images/NOro67t9uvYGMgZTGdf2IOoQiw.png" alt="" />
      </div>

      <div>
        <BentoGrid className="max-w-[80vw] mx-auto">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      </div>

      <div className="flex flex-col justify-center items-center p-5 m-20 ">
        <div className="text-center max-w-xl space-y-2 tracking-wider p-5">
            <div className="text-4xl font-bold">
            Keep everything in one place.
            </div>
            <div className="text-lg text-gray-600">
            Eliminate the struggle of juggling diferent softwares. Enjoy a single, streamlined experience.
            </div>
        </div>

        <div className="grid grid-cols-12 max-w-[70vw] mx-auto gap-6 items-center justify-center m-auto">
    <div className="col-span-4 bg-white shadow-lg rounded-xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl">
        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="w-12 h-12 mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Tasks Management</h2>
            <p className="text-gray-700 text-sm">Prioritize and organize tasks with intuitive sub-task breakdown.</p>
        </div>
    </div>

    <div className="col-span-4 bg-white shadow-lg rounded-xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl">
        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="w-12 h-12 mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h16M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Goal Tracking</h2>
            <p className="text-gray-700 text-sm">Visualize and monitor your objectives with precision.</p>
        </div>
    </div>

    <div className="col-span-4 bg-white shadow-lg rounded-xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl">
        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="w-12 h-12 mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Note Management</h2>
            <p className="text-gray-700 text-sm">Capture and organize your thoughts seamlessly.</p>
        </div>
    </div>

    <div className="col-span-4 col-start-3 bg-white shadow-lg rounded-xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl">
        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="w-12 h-12 mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Time Tracking</h2>
            <p className="text-gray-700 text-sm">Optimize productivity with precise time management.</p>
        </div>
    </div>

    <div className="col-span-4 mx-auto bg-white shadow-lg rounded-xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl">
        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="w-12 h-12 mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Project Tracking</h2>
            <p className="text-gray-700 text-sm">Manage and monitor project progress effectively.</p>
        </div>
    </div>
</div>

      </div>

      <div className="flex flex-col justify-center items-center m-10 gap-5">
        <div className="text-center max-w-xl space-y-2 tracking-wider p-5">
            <div className="text-4xl font-bold">
            Keep everything in one place.
            </div>
            <div className="text-lg text-gray-600">
            Eliminate the struggle of juggling diferent softwares. Enjoy a single, streamlined experience.
            </div>
        </div>
        <div className="flex max-w-[80vw] justify-between items-center">
          <div className="w-3/12">
            <span className="text-9xl flex items-center justify-center text-gray-200 hover:text-black">1</span>
            <span className=" flex items-center justify-center " >Duplicate</span>
            <div className="text-center text-gray-500">
                Open the template link and duplicate it to your Notion account.
            </div>
          </div>

          <img className="w-16 h-16 rotate-45" src="https://framerusercontent.com/images/t5ISSOEGx872DJTBGPFZvQkyaaQ.svg" alt="" />

          <div className="w-3/12">
            <span className="text-9xl flex items-center justify-center text-gray-200 hover:text-black">2</span>
            <span className=" flex items-center justify-center " >Duplicate</span>
            <div className="text-center text-gray-500">
                Open the template link and duplicate it to your Notion account.
            </div>
          </div>

          <img className="w-16 h-16 rotate-45" src="https://framerusercontent.com/images/t5ISSOEGx872DJTBGPFZvQkyaaQ.svg" alt="" />

          <div className="w-3/12">
            <span className="text-9xl flex items-center justify-center text-gray-200 hover:text-black">3</span>
            <span className=" flex items-center justify-center " >Duplicate</span>
            <div className="text-center text-gray-500">
                Open the template link and duplicate it to your Notion account.
            </div>
          </div>
        </div>
            <button onClick={e=>forwardToUserBrain()} className="relative inline-flex h-16 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex text-xl tracking-widest h-full w-full cursor-pointer items-center justify-center rounded-full bg-white  hover:bg-slate-950 hover:text-white text-black px-12 py-5 font-medium border-4 backdrop-blur-3xl">
                Build my Second Brain
              </span>
            </button>
      </div>
    </div>

  );
};

export default HomePage;
