import { Card, CardContent } from "@/components/ui/Card";
import { Briefcase, Building, MapPin, Bookmark } from "lucide-react";
import Button from "@/components/ui/Button";

// Mock data for jobs
const JOBS = [
    {
        id: 1,
        title: "Senior Software Engineer",
        company: "Google",
        location: "Mountain View, CA (Hybrid)",
        type: "Full-time",
        postedAt: "2h ago",
        logo: "/logos/google.png"
    },
    {
        id: 2,
        title: "Frontend Developer",
        company: "Netflix",
        location: "Los Gatos, CA (Remote)",
        type: "Contract",
        postedAt: "5h ago",
        logo: "/logos/netflix.png"
    },
    {
        id: 3,
        title: "Product Manager",
        company: "Tesla",
        location: "Austin, TX (On-site)",
        type: "Full-time",
        postedAt: "1d ago",
        logo: "/logos/tesla.png"
    },
    {
        id: 4,
        title: "UX Designer",
        company: "Apple",
        location: "Cupertino, CA",
        type: "Full-time",
        postedAt: "3d ago",
        logo: "/logos/apple.png"
    }
];

export default function JobsPage() {
    return (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">

            {/* LEFT SIDEBAR */}
            <div className="hidden md:block col-span-1 space-y-4">
                <Card>
                    <CardContent className="p-0">
                        <div className="p-4 font-semibold text-sm flex items-center gap-3 hover:bg-gray-100 cursor-pointer text-gray-600">
                            <Bookmark className="h-5 w-5" />
                            My Jobs
                        </div>
                        <div className="p-4 font-semibold text-sm flex items-center gap-3 hover:bg-gray-100 cursor-pointer text-gray-600 border-t border-gray-100">
                            <Briefcase className="h-5 w-5" />
                            Job Alerts
                        </div>
                        <div className="p-4 font-semibold text-sm flex items-center gap-3 hover:bg-gray-100 cursor-pointer text-gray-600 border-t border-gray-100">
                            <MapPin className="h-5 w-5" />
                            Salary
                        </div>
                    </CardContent>
                </Card>

                <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                    Post a free job
                </Button>
            </div>

            {/* MAIN CONTENT */}
            <div className="md:col-span-3 space-y-4">

                {/* SEARCH HERO */}
                <Card className="bg-[#EEF3F8] border-none">
                    <div className="p-8 text-center pt-12 pb-12">
                        <h1 className="text-3xl font-light mb-2">Find your next dream job</h1>
                        <p className="text-gray-600 mb-6">Suggestions based on your profile and search history</p>

                        <div className="bg-white p-2 rounded shadow-sm max-w-lg mx-auto flex gap-2">
                            <input
                                type="text"
                                placeholder="Search by title, skill, or company"
                                className="flex-1 px-3 py-2 outline-none text-sm"
                            />
                            <Button>Search</Button>
                        </div>
                    </div>
                </Card>

                {/* JOB LIST */}
                <Card>
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="font-semibold text-xl">Recommended for you</h2>
                        <span className="text-gray-500 text-sm">Based on your profile</span>
                    </div>
                    <div>
                        {JOBS.map((job) => (
                            <div key={job.id} className="p-4 flex gap-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer group relative">
                                {/* Logo (Placeholder color block) */}
                                <div className="h-14 w-14 bg-gray-200 rounded flex items-center justify-center text-gray-400 font-bold text-xs">
                                    LOGO
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-semibold text-blue-600 group-hover:underline text-base font-sans">
                                        {job.title}
                                    </h3>
                                    <p className="text-sm text-gray-900">{job.company}</p>
                                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        {job.location} ({job.type})
                                    </p>
                                    <div className="mt-2 text-xs text-green-700 font-semibold flex items-center gap-1">
                                        <Building className="h-3 w-3" />
                                        Actively recruiting
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">{job.postedAt}</p>
                                </div>

                                <button className="absolute top-4 right-4 p-2 hover:bg-gray-200 rounded-full">
                                    <X className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="p-3 text-center border-t border-gray-100">
                        <button className="font-semibold text-gray-600 hover:underline text-sm flex items-center justify-center w-full gap-1">
                            Show all <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    );
}

function X({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
}

function ArrowRight({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
}
