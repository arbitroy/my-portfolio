import AutomatedSearchProjects from '../content/AutomatedSearchProjects';
import AnimationContainer from '../utils/AnimationContainer';
import SectionContainer from '../utils/SectionContainer';
import TitleSectionPageContainer from '../utils/TitleSectionPageContainer';

const myGithub = 'https://github.com/arbitroy';

const ProjectsSection = () => {
  return (
    <SectionContainer>
      <div className="w-full flex flex-col gap-6">
        <TitleSectionPageContainer title="Projects" />

        <AnimationContainer customClassName="w-full flex flex-col gap-5 mb-8">
          <p className="w-full text-base text-gray-400">
            These projects are automatically synced from my GitHub repositories.
            Featured projects and latest work are highlighted. If you want to
            see absolutely all my projects go to my{' '}
            <a
              href={myGithub}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:underline transition-all ease"
            >
              github.com/arbitroy
            </a>
            .
          </p>
        </AnimationContainer>

        <AutomatedSearchProjects />
      </div>
    </SectionContainer>
  );
};

export default ProjectsSection;
