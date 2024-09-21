import AnimationContainer from '../utils/AnimationContainer';
import { calculateDuration } from './CurrentTimeLineExp';

const AboutMe = () => {
  return (
    <AnimationContainer customClassName='w-full mb-16'>

      <h2 className='font-bold text-2xl tracking-tight mb-8 text-white text-center lg:text-start'>
        About me
      </h2>

      <p className='text-base text-gray-400'>
        I am a passionate and versatile developer with over +{calculateDuration('2021-01-01', false)} of JavaScript experience and a constant interest in learning new technologies.
      </p>

    </AnimationContainer>
  )
}

export default AboutMe;