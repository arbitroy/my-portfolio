'use client';

import { useState, useMemo } from 'react';
import { useGitHubProjects } from '@/hooks/useGitHubProjects';
import CardProject from './CardProject';
import AnimationContainer from '../utils/AnimationContainer';

const AutomatedSearchProjects = () => {
    const { projects, loading, error } = useGitHubProjects();
    const [projectSearch, setProjectSearch] = useState<string>('');

    const filteredProjects = useMemo(() => {
        if (!projectSearch) return projects;

        return projects.filter(project =>
            project.category.toLowerCase().includes(projectSearch.toLowerCase()) ||
            project.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
            project.des.toLowerCase().includes(projectSearch.toLowerCase())
        );
    }, [projects, projectSearch]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-400 mb-4">Error loading projects: {error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <>
            <AnimationContainer customClassName='w-full group flex flex-col justify-center items-center mb-8'>
                <div className='w-full flex items-center lg:w-3/6 h-12 rounded shadow-lg bg-black border border-gray-800 group-hover:border-gray-500 transition-all ease'>
                    <div className='grid place-items-center h-full w-12 text-gray-500'>
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='1' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                        </svg>
                    </div>

                    <input
                        className='peer h-full w-full outline-none rounded text-sm text-white bg-black px-2 group-hover:border-gray-500 transition-all ease'
                        type='text'
                        id='search'
                        placeholder='Languages, frameworks, project names...'
                        onChange={e => setProjectSearch(e.target.value)}
                        value={projectSearch}
                    />
                </div>

                <div className="mt-4 text-center">
                    <p className="text-gray-400 text-sm">
                        Showing {filteredProjects.length} of {projects.length} projects from GitHub
                    </p>
                </div>
            </AnimationContainer>

            <article className='w-full flex justify-center items-center content-center flex-wrap gap-6 mx-auto'>
                {filteredProjects.map((project) => (
                    <div key={project.id} className="relative">
                        <CardProject
                            title={project.title}
                            des={project.des}
                            category={project.category}
                            repo={project.repo}
                            link={project.link}
                        />
                        {project.featured && (
                            <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">
                                ⭐ Featured
                            </div>
                        )}
                        {project.stars && project.stars > 0 && (
                            <div className="absolute -top-2 -left-2 bg-gray-700 text-white text-xs px-2 py-1 rounded-full">
                                ⭐ {project.stars}
                            </div>
                        )}
                    </div>
                ))}
            </article>

            {filteredProjects.length === 0 && projectSearch && (
                <div className="text-center py-12">
                    <p className="text-gray-400">No projects found matching "{projectSearch}"</p>
                </div>
            )}
        </>
    );
};

export default AutomatedSearchProjects;