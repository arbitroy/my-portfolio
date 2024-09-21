import AboutMe from '../content/AboutMe';
import ContactMe from '../content/ContactMe';
import CurrentFavTech from '../content/CurrentFavTech';
import CurrentLearning from '../content/CurrentLearning';
import CurrentTimeLineExp from '../content/CurrentTimeLineExp';
import FavProjects from '../content/FavProjects';
import Hero from '../content/Hero';
import AnimationContainer from '../utils/AnimationContainer';
import { skills } from '../utils/mySkills';
import SectionContainer from '../utils/SectionContainer';
import ShowSkills from '../utils/ShowSkills';

const HomeSection = () => {
  return (
    <SectionContainer>

      <Hero />

      <CurrentFavTech />
      <CurrentLearning />

      <div className='w-full flex flex-col items-start'>

        <AboutMe />

        <CurrentTimeLineExp />

        <FavProjects />

        <AnimationContainer customClassName='w-full flex flex-col gap-5 mb-8'>

          <h2 className='font-bold text-2xl md:text-2xl tracking-tight mb-2 text-white text-start'>Skills</h2>

          <p className='text-base text-gray-400'>
            As a seasoned developer, I've transitioned from a dedicated student to a proficient problem solver with a background in computer science. I leverage a variety of programming languages and tools to architect robust and scalable solutions for diverse challenges.
            My experience spans across multiple projects and engagements, where I've honed my skills in software development through academic pursuits, extracurricular activities, and professional endeavors. In addition to my technical expertise, I bring a track record of excellence, including achievements such as the Presidential Award and involvement with organizations like St. John.
            Balancing freelance projects with employment commitments, I navigate a dynamic career path, dedicated to delivering high-quality, tailored solutions to clients and employers alike.
          </p>



          <div className='flex flex-col items-start gap-3 mt-3'>

            {
              skills.map(({ title, techs }) => (
                <div key={title}>

                  <h3 className='font-bold text-1xl md:text-1xl tracking-tight mb-5 text-white text-start'>{title}</h3>

                  <AnimationContainer customClassName='flex items-center flex-wrap gap-3 mb-5'>
                    <ShowSkills skills={techs} />
                  </AnimationContainer>

                </div>
              ))
            }

          </div>

        </AnimationContainer>

        <ContactMe />

      </div>

    </SectionContainer>
  )
}

export default HomeSection;