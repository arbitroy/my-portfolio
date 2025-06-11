import AutomatedSearchProjects from '../content/AutomatedSearchProjects';
import { ProjectsHeader } from '../ui/ProjectsHeader';
import AnimationContainer from '../utils/AnimationContainer';
import SectionContainer from '../utils/SectionContainer';
import TitleSectionPageContainer from '../utils/TitleSectionPageContainer';

const ProjectsSection = () => {
  return (
    <SectionContainer>
      <div className='w-full flex flex-col gap-6'>
        <TitleSectionPageContainer title='Projects' />
        
        <AnimationContainer customClassName='w-full flex flex-col gap-5 mb-8'>
          <p className='w-full text-base text-gray-400'>
            These projects are automatically synced from my GitHub repositories. 
            Featured projects and latest work are highlighted. 
            Check out my complete portfolio at{' '}
            <a href="https://github.com/arbitroy" target='_blank' rel='noopener noreferrer' 
               className='hover:text-white hover:underline transition-all ease'>
              github.com/arbitroy
            </a>.
          </p>
        </AnimationContainer>

        <AutomatedSearchProjects />
      </div>
    </SectionContainer>
  );
};