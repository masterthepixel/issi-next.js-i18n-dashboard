"use client";

import { AcademicCapIcon, CogIcon, UsersIcon } from '@heroicons/react/20/solid';
import { FormattedMessage } from "react-intl";

export default function ELearningHero() {
  return (
    <div className="relative bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-7xl lg:flex lg:justify-between lg:px-8 xl:justify-end">
        <div className="lg:flex lg:w-1/2 lg:shrink lg:grow-0 xl:absolute xl:inset-y-0 xl:right-1/2 xl:w-1/2">
          <div className="relative h-80 lg:-ml-8 lg:h-auto lg:w-full lg:grow xl:ml-0">
            <img
              alt="E-Learning Solutions"
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
              className="absolute inset-0 size-full bg-gray-50 dark:bg-slate-800 object-cover"
            />
            {/* Dots overlay */}
            <div 
              className="absolute right-0 top-0 w-32 h-32 opacity-30"
              style={{
                backgroundImage: 'radial-gradient(circle, #d1d5db 2px, transparent 2px)',
                backgroundSize: '20px 20px',
                zIndex: 1
              }}
            />
            {/* Experience badge */}
            <div className="absolute bottom-0 right-0 bg-blue-700 text-white p-6 m-4">
              <div className="text-center">
                <div className="text-4xl font-bold">22</div>
                <div className="text-lg">
                  <FormattedMessage id="page.eLearning.hero.years" defaultMessage="Years" />
                </div>
                <div className="text-base font-semibold">
                  <FormattedMessage id="page.eLearning.hero.experience.label" defaultMessage="Experience" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 lg:contents">
          <div className="mx-auto max-w-2xl pt-16 pb-24 sm:pt-20 sm:pb-32 lg:mr-0 lg:ml-8 lg:w-full lg:max-w-lg lg:flex-none lg:pt-32 xl:w-1/2">
            <p className="text-base/7 font-semibold text-blue-600 dark:text-blue-400">
              <FormattedMessage id="page.eLearning.hero.tagline" defaultMessage="Learning Solutions" />
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white sm:text-5xl">
              <FormattedMessage id="page.eLearning.hero.title" defaultMessage="E-Learning" />
            </h1>
            <p className="mt-6 text-xl/8 text-gray-700 dark:text-slate-300">
              <FormattedMessage 
                id="page.eLearning.hero.intro" 
                defaultMessage="With strong expertise in managing the Instructional Systems Design (ISD) process - including conceptualization of design, e-Learning development, implementation, and evaluation - ISSI's professionals have successfully implemented user and system documentation/training for our clients."
              />
            </p>
            <div className="mt-10 max-w-xl text-base/7 text-gray-700 dark:text-slate-300 lg:max-w-none">
              <p>
                <FormattedMessage 
                  id="page.eLearning.hero.tools" 
                  defaultMessage="Our e-Learning developers have created interactive courseware using Outstart Trainer, SumTotal LCMS, Adobe Captivate, and other authoring tools. Additionally, our multimedia programmers are experienced in Dreamweaver, Flash, Adobe Premier, Adobe Photoshop, and a variety of digital A/V composition and editing tools, as well as AICC and SCORM 2004 authoring requirements."
                />
              </p>
              <ul role="list" className="mt-8 space-y-8 text-gray-600 dark:text-slate-300">
                <li className="flex gap-x-3">
                  <AcademicCapIcon aria-hidden="true" className="mt-1 size-5 flex-none text-blue-600 dark:text-blue-400" />
                  <span>
                    <strong className="font-semibold text-gray-900 dark:text-white">
                      <FormattedMessage id="page.eLearning.hero.feature1.title" defaultMessage="Learning Management Systems." />
                    </strong>
                    {' '}
                    <FormattedMessage 
                      id="page.eLearning.hero.feature1.desc" 
                      defaultMessage="Our ability to implement, configure, customize, and maintain learning management systems have been demonstrated by successful implementation of LMS solutions at both enterprise and global level."
                    />
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CogIcon aria-hidden="true" className="mt-1 size-5 flex-none text-blue-600 dark:text-blue-400" />
                  <span>
                    <strong className="font-semibold text-gray-900 dark:text-white">
                      <FormattedMessage id="page.eLearning.hero.feature2.title" defaultMessage="Custom Development." />
                    </strong>
                    {' '}
                    <FormattedMessage 
                      id="page.eLearning.hero.feature2.desc" 
                      defaultMessage="The business logic behind these learning management systems have been developed by our senior technical personnel with customized code and user interface to meet government usability and accessibility requirements."
                    />
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <UsersIcon aria-hidden="true" className="mt-1 size-5 flex-none text-blue-600 dark:text-blue-400" />
                  <span>
                    <strong className="font-semibold text-gray-900 dark:text-white">
                      <FormattedMessage id="page.eLearning.hero.feature3.title" defaultMessage="Industry Partnerships." />
                    </strong>
                    {' '}
                    <FormattedMessage 
                      id="page.eLearning.hero.feature3.desc" 
                      defaultMessage="ISSI has relationships with industry leaders such as THINQ Learning Solutions, CENTRA, and Prometric, along with reseller agreements with leading LMS and LCMS vendors including SumTotal Systems."
                    />
                  </span>
                </li>
              </ul>
              <p className="mt-8">
                <FormattedMessage 
                  id="page.eLearning.hero.certification" 
                  defaultMessage="International Software Systems, Inc. is an SBA certified small business that specializes in the learning domain. In addition to our vendor relationships, ISSI has business relationships with leading Learning Management, Virtual Classroom, Learning Evaluation (Kirkpatrick Levels 1-4), and Hosting vendors in order to provide distinct quality solutions through the GSA Schedule and Fastrac programs."
                />
              </p>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <FormattedMessage id="page.eLearning.hero.talent.title" defaultMessage="Performance & Talent Management" />
              </h2>
              <p className="mt-6">
                <FormattedMessage 
                  id="page.eLearning.hero.talent.desc" 
                  defaultMessage="ISSI's full range of performance and talent management services stem from its business contacts which use performance management vendors along with some human capital development industry's leading job and skills analysis vendors. Our depth of knowledge and experience helps us understand and adapt to the needs of human resources and training organizations of all sizes."
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
