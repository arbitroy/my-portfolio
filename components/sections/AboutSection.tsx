import CurrentTimeLineExp, {
  calculateDuration
} from '../content/CurrentTimeLineExp';
import AnimationContainer from '../utils/AnimationContainer';
import SectionContainer from '../utils/SectionContainer';
import ShowSkills from '../utils/ShowSkills';
import TitleSectionPageContainer from '../utils/TitleSectionPageContainer';
import ProcessWork from '../content/ProcessWork';
import { skills } from '../utils/mySkills';

const AboutSection = () => {
  return (
    <SectionContainer>
      <div className="w-full flex flex-col gap-6">
        <TitleSectionPageContainer title="About me" />

        <AnimationContainer customClassName="w-full flex flex-col gap-5 mb-8">
          <p className="text-base text-gray-400">
            As a seasoned developer with over +
            {calculateDuration('2021-01-01', false)} of JavaScript experience,
            I've transitioned from a dedicated student to a proficient problem
            solver with a background in computer science. I leverage a variety
            of programming languages and tools to architect robust and scalable
            solutions for diverse challenges. My journey has led me to
            continuously learn new technologies, with a focus on Go, Java,
            Firebase, and Pesapal for building and integrating APIs.
          </p>

          <p className="text-base text-gray-400">
            My experience spans multiple projects and engagements, where I've
            honed my skills in software development through academic pursuits,
            extracurricular activities, and professional endeavors. I have a
            solid foundation in web, mobile, and desktop frontend development.
            On the backend, I specialize in Go and Java, with Firebase and
            Pesapal for APIs, always following best practices including clean
            architecture, "SOLID" principles, pixel-perfect designs, GitFlow,
            and agile methodologies.
          </p>

          <p className="text-base text-gray-400">
            Beyond my regular work, I dedicate time to freelance and personal
            projects, crafting software and products from design to deployment.
            I focus on solving problems or offering inspiration through
            innovative solutions. By integrating AI with APIs, such as Llama, I
            enable interactive command-based interfaces that provide users with
            actionable results. As I look forward, my goal is to become a
            proficient AR developer, while maintaining my expertise in frontend
            development.
          </p>
        </AnimationContainer>

        <CurrentTimeLineExp />

        <AnimationContainer customClassName="w-full flex flex-col gap-5 mb-8">
          <h2 className="font-bold text-2xl md:text-2xl tracking-tight mb-2 text-white text-start">
            Skills
          </h2>

          <p className="text-base text-gray-400">
            A look at all the programming languages, libraries, and tools I've
            worked with, I started programming about +
            {calculateDuration('2020-01-01', false)} ago. I have tried a few
            programming languages and technology stack, both Backend and
            Frontend.
          </p>

          <p className="text-base text-gray-400">
            Event though the scope of web development is wide, I was very
            interested and focused on Frontend development.
          </p>

          <div className="flex flex-col items-start gap-3 mt-3">
            {skills.map(({ title, techs }) => (
              <div key={title}>
                <h3 className="font-bold text-1xl md:text-1xl tracking-tight mb-5 text-white text-start">
                  {title}
                </h3>

                <AnimationContainer customClassName="flex items-center flex-wrap gap-3 mb-5">
                  <ShowSkills skills={techs} />
                </AnimationContainer>
              </div>
            ))}
          </div>
        </AnimationContainer>

        <ProcessWork />

        <AnimationContainer customClassName="w-full flex flex-col gap-5">
          <h2 className="font-bold text-2xl md:text-2xl tracking-tight mb-2 text-white text-start">
            Interests & Goals
          </h2>

          <p className="text-base text-gray-400">
            I am interested in learning Backend with other language like Java,
            Go or with Python. I also want to know how to make a video game with
            Unity or other and I am very interested in being a content creator
            whether programming or something else.
          </p>
          <p className="text-base text-gray-400">
            I am also interested in learning other things besides programming
            such as 3D design with Blender and video editing with Davinci
            Resolve (these last two I would take as a hobby).
          </p>
        </AnimationContainer>
      </div>
    </SectionContainer>
  );
};

export default AboutSection;
