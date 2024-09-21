'use client';

import { useState } from 'react';
import CardProject from './CardProject';
import AnimationContainer from '../utils/AnimationContainer';
import { CardProjectProps } from '@/types';

const allProjectsInfo = [
  {
    id: '1',
    title: 'Myusiki Foundation Platform',
    des: 'A platform for creatives to be nurtured, network and promote their works',
    category: 'javascript - react',
    repo: 'https://github.com/arbitroy/myusiki',
    link: 'https://myusiki.org/'
  },
  {
    id: '2',
    title: 'Hungrima store management system',
    des: 'This an automation of the previous ledgerbook method to an efficient and increasing productivity',
    category: 'Java - JavaFx - MaterialFx - SQlite',
    repo: 'https://github.com/arbitroy/HUNGRIMA-STORE',
    link: 'https://github.com/arbitroy/HUNGRIMA-STORE'
  },
  {
    id: '3',
    title: 'FashionFushion',
    des: 'An ecommerce platform for tailors',
    category: 'React Native - Pesapal - Firebase - expressjs',
    repo: 'https://github.com/arbitroy/FashionFushion',
    link: 'https://expo.dev/accounts/austine_ndauwa/projects/fashion-fushion/builds/dd669812-81aa-4647-bb62-59bbf7bac522'
  },
  {
    id: '4',
    title: 'Lunar Explorer',
    des: 'The Lunar Explorer👾👩‍🚀 is an educational game that teaches👩‍🏫 players about moon phases through interactive puzzles. Players solve sliding puzzles to reveal images of different moon🌑🌒🌓🌛 phases and learn corresponding lunar facts.✨',
    category: 'java-javafx',
    repo: 'https://github.com/arbitroy/lunar_explorer',
    link: 'https://github.com/arbitroy/lunar_explorer'
  },
  {
    id: '5',
    title: 'Play4Good',
    des: 'Play4Good is an innovative platform that gamifies charitable giving and social impact. It allows users to support various causes through donations while engaging in friendly competition and team-based activities.',
    category: 'typescript - nextjs',
    repo: 'https://github.com/arbitroy/Play4Good',
    link: 'https://github.com/arbitroy/Play4Good'
  },
  {
    id: '6',
    title: 'Whatsapp_parser',
    des: 'A lifesaver that automatically scoops up your daily confessions from WhatsApp, like "Today, I sold my soul pushing spreadsheets and pretending to care about Steve\'s new \'game-changing\' idea." It\'s your personal log of corporate servitude, perfect for remembering exactly how much of your sanity you\'ve sacrificed for the company\'s bottom line—one chat at a time!',
    category: 'Go',
    repo: 'https://github.com/arbitroy/whatsapp_parser',
    link: 'https://github.com/arbitroy/whatsapp_parserhttps://mapsapp.vercel.app'
  },
 
];

const SearchAllProjects = () => {

  const [projectSearch, setProjectSearch] = useState<string>('');

  const resultSearch: CardProjectProps[] = allProjectsInfo.filter(project => project.category.includes(projectSearch.toLowerCase()))

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
            placeholder='Languages, frameworks, libraries, etc...'
            onChange={e => setProjectSearch(e.target.value)} />
        </div>

      </AnimationContainer>

      <article className='w-full flex justify-center items-center content-center flex-wrap gap-6 mx-auto'>
        {
          resultSearch.map(({ id, title, des, category, repo, link }) => <CardProject key={id} title={title} des={des} category={category} repo={repo} link={link} />)
        }
      </article>
    </>
  )

}

export default SearchAllProjects;