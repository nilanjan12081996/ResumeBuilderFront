'use client';
import React from 'react';
import { IoMdContact } from 'react-icons/io';
import { BsBagFill } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi';

const TITLE_ICON_MAP = {
    Profile: IoMdContact,
    Experience: BsBagFill,
    Projects: FaStar,
    Education: HiAcademicCap,
    Certifications: FaStar,
};

const CorporateTemplate = ({ formData }) => {
    const resumeData = {
        personalInfo: {
            name: 'SOUVICK PANJA',
            title: 'Frontend Developer',
            location: 'Kolkata, West Bengal, India',
            phone: '8327611187',
            email: 'souvick1@gmail.com',
            links: ['GitHub', 'LinkedIn', 'Personal Website'],
        },

        summary: {
            title: 'Profile',
            description:
                'A highly motivated and passionate Frontend Developer with strong expertise in React.js, Next.js, TypeScript, and UI/UX design principles. Skilled in building responsive, user-focused web applications and integrating RESTful APIs.',
        },

        skills: {
            title: 'Skills Summary',
            items: [
                'JavaScript',
                'TypeScript',
                'HTML',
                'CSS',
                'React.js',
                'Next.js',
                'Redux',
                'TanStack Query',
                'MUI',
                'Tailwind CSS',
                'Bootstrap',
                'Supabase',
                'Firebase',
                'REST APIs',
                'Git',
            ],
        },

        experience: {
            title: 'Experience',
            items: [
                {
                    role: 'Freelance HTML Developer',
                    company: 'Self-employed',
                    start: '2023',
                    end: '2024',
                    points: [
                        'Worked on multiple static and responsive websites using HTML, CSS, and JavaScript.',
                        'Improved semantic HTML structure and cross-browser compatibility.',
                    ],
                },
                {
                    role: 'Frontend Developer (Trainee)',
                    company: 'Webskitters Technology Solutions, Kolkata',
                    start: '2024',
                    end: '2025',
                    points: [
                        'Built optimized responsive UIs using React.js, Next.js, and Material UI.',
                        'Integrated APIs with React Query, improving performance by 30%.',
                        'Refactored legacy code and implemented Redux for scalability.',
                    ],
                },
            ],
        },

        education: {
            title: 'Education',
            items: [
                {
                    degree: 'Frontend Developer Training',
                    institute: 'Webskitters Academy',
                    location: 'Kolkata, India',
                    start: '2024',
                    end: '2025',
                },
                {
                    degree: 'Bachelor of Arts',
                    institute: 'Netaji Subhas Open University',
                    location: 'Bagnan, Howrah',
                    start: '2020',
                    end: '2023',
                },
            ],
        },

        certifications: {
            title: 'Certifications',
            items: [
                {
                    name: 'Frontend Developer (React JS)',
                    start: '2024',
                    end: '2025',
                },
                {
                    name: 'Code With Puja Contest Award',
                    start: '2024',
                    end: '2025',
                },
            ],
        },

        projects: {
            title: 'Projects',
            items: [
                {
                    name: 'Task Management System – Taskify',
                    points: [
                        'Developed a full task management system using Next.js and Supabase.',
                        'Implemented authentication, task priority, deadlines, and reporting.',
                        'Used Tailwind CSS and TanStack Query.',
                    ],
                },
                {
                    name: 'Fresh Bazar – Grocery Platform',
                    points: [
                        'Built a responsive grocery e-commerce platform.',
                        'Implemented category filtering, search, and checkout.',
                        'Used React.js, Redux, Material UI, and REST APIs.',
                    ],
                },
            ],
        },
    };

    return (
        <div className="min-h-[297mm] bg-white shadow-xl font-sans text-sm">

            <div className="text-center py-6">
                <h1 className="text-2xl font-bold tracking-wide">
                    {resumeData.personalInfo.name}
                </h1>
                <p className="uppercase text-[10px] text-gray-600 mt-1">
                    {resumeData.personalInfo.title} • {resumeData.personalInfo.location} •{' '}
                    {resumeData.personalInfo.phone}
                </p>
            </div>

            <div className="flex">

                <aside className="w-[32%] px-6 py-6 space-y-6 text-center">

                    <section>
                        <h3 className="text-xs font-bold uppercase mb-2">Details</h3>
                        <p className="text-xs">{resumeData.personalInfo.location}</p>
                        <p className="text-xs">{resumeData.personalInfo.phone}</p>
                        <p className="text-xs break-all">{resumeData.personalInfo.email}</p>
                    </section>

                    <section>
                        <h3 className="text-xs font-bold uppercase mb-2">Links</h3>
                        {resumeData.personalInfo.links.map((l, i) => (
                            <p key={i} className="text-xs">{l}</p>
                        ))}
                    </section>

                    <section>
                        <h3 className="text-xs font-bold uppercase mb-2">
                            {resumeData.skills.title}
                        </h3>
                        <ul className="space-y-1">
                            {resumeData.skills.items.map((s, i) => (
                                <li key={i} className="text-xs">{s}</li>
                            ))}
                        </ul>
                    </section>
                </aside>

                <main className="w-[68%] px-8 py-6 space-y-8">

                    <section>
                        <h2 className="text-sm font-bold uppercase mb-2">
                            {resumeData.summary.title}
                        </h2>
                        <p className="text-xs text-gray-700 text-justify">
                            {resumeData.summary.description}
                        </p>
                    </section>

                    <TimelineSection
                        title={resumeData.experience.title}
                        items={resumeData.experience.items.map(e => ({
                            heading: `${e.role}, ${e.company}`,
                            period: `${e.start} — ${e.end}`,
                            points: e.points,
                        }))}
                    />

                    {/* EDUCATION */}
                    <TimelineSection
                        title={resumeData.education.title}
                        items={resumeData.education.items.map(e => ({
                            heading: `${e.degree}, ${e.institute}, ${e.location}`,
                            period: `${e.start} — ${e.end}`,
                        }))}
                    />

                    {/* CERTIFICATIONS */}
                    <TimelineSection
                        title={resumeData.certifications.title}
                        items={resumeData.certifications.items.map(c => ({
                            heading: c.name,
                            period: `${c.start} — ${c.end}`,
                        }))}
                    />


                    <TimelineSection
                        title={resumeData.projects.title}
                        items={resumeData.projects.items.map(p => ({
                            heading: p.name,
                            points: p.points,
                        }))}
                    />

                    {/* CUSTOM SECTIONS */}
                    {formData && Object.keys(formData)
                        .filter(key => key.startsWith('customSectionHistory_'))
                        .map(key => {
                            const sectionId = key.replace('customSectionHistory_', '');
                            const history = formData[key];
                            const title = formData[`customSectionTitle_${sectionId}`] || 'Custom Section';

                            if (!history?.some(item => item.activity || item.city)) return null;

                            return (
                                <TimelineSection
                                    key={sectionId}
                                    title={title}
                                    items={history.map(item => ({
                                        heading: `${item.activity}${item.city ? `, ${item.city}` : ''}`,
                                        period: `${item.startDate ? new Date(item.startDate).toLocaleString('en-US', { month: 'short', year: 'numeric' }).toUpperCase() : ''} ${item.startDate && item.endDate ? '—' : ''} ${item.endDate ? new Date(item.endDate).toLocaleString('en-US', { month: 'short', year: 'numeric' }).toUpperCase() : ''}`,
                                        points: item.description ? [item.description] : [],
                                    }))}
                                />
                            );
                        })}

                </main>
            </div>
        </div>
    );
};

const TimelineSection = ({ title, items }) => {
    const Icon = TITLE_ICON_MAP[title];

    return (
        <section>
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-4">
                {Icon && <Icon className="text-md" />}
                {title}
            </h2>

            <div className="relative border-l border-gray-400 pl-4 space-y-6 left-[6px]">
                {items.map((item, i) => (
                    <div key={i} className="relative">

                        {/* HEADING */}
                        <h4 className="text-xs font-bold leading-snug">
                            {item.heading}
                        </h4>

                        {/* PERIOD */}
                        {item.period && (
                            <p className="text-[10px] text-gray-500 mt-1">
                                {item.period}
                            </p>
                        )}

                        {/* BULLETS */}
                        {item.points && (
                            <ul className="list-disc pl-4 mt-2 space-y-1 text-xs text-gray-700">
                                {item.points.map((p, idx) => (
                                    <li key={idx}>{p}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};



export default CorporateTemplate;
