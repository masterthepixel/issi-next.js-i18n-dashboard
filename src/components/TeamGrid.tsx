import React from "react";
import Image from "next/image";

const people = [
	{
		name: "Bhaskar Ganti, PMP",
		role: "CEO",
		imageUrl: "/images/1.jpg",
		bio: `For over 28 years, Bhaskar Ganti, has been a prominent figure in the worldwide information technology industry, overseeing divisions and business units in India and the United States. Bhaskar has been instrumental in fostering a culture of transparency and openness, instilling a "never let you down, can do" mentality.`,
	},
	{
		name: "Mark Anderson, PMP",
		role: "Executive Consultant",
		imageUrl: "/images/2.jpg",
		bio: `Mark is an accomplished, innovative executive with over 37 years of software and courseware life-cycle management experience. He has experience managing information technology services, products, and projects. In every assignment, He is known for accomplishing both corporate and customer objectives in every assignment that he undertakes.`,
	},
	{
		name: "Erina Rajbhandari",
		role: "Director - Finance & Contracts",
		imageUrl: "/images/3.jpg",
		bio: `Erina is an exceptional leader known for her remarkable organizational and resourceful skills. Her academic background in accounting and proficiency in analytical and problem-solving abilities makes her a valuable asset to any team. She is highly efficient in handling multiple projects and delivering high-quality work in fast-paced, deadline-driven environment.`,
	},
	{
		name: "Umesh Pokhrel",
		role: "Director - Finance & Accounts",
		imageUrl: "/images/4.jpg",
		bio: `Umesh is responsible for managing and supervising the day-to-day functions of the accounting department, examining and interpreting accounting data, generating financial reports, and establishing and enforcing appropriate accounting methods, policies, and principles. He is also a valued member of ISSI's Oversight Group that monitors and supports the various business units achieve operational excellence.`,
	},
	{
		name: "Elizabeth LaGrange Smith",
		role: "Senior Human Resource Manager",
		imageUrl: "/images/5.jpg",
		bio: `Elizabeth is a senior-level manager with experience in Human Resources, Employee Benefits, Administration, and Operations. A business partner with more than 25 years of progressive leadership experience in telecommunications, information systems, legal, financial, and medical industries. Liz demonstrates success in shaping high-performing cultures and streamlining business operations, including employee management, strategic planning, performance measurement, and staff development & training.`,
	},
	{
		name: "Nilanjana Bhattacharya",
		role: "Senior Manager, Proposal Development",
		imageUrl: "/images/6.png",
		bio: `Nilanjana, the Proposal Manager at International Software Systems, Inc., is responsible for leading and supervising the proposal development procedures, overseeing the entire lifecycle starting from opportunity identification by the Capture Team to submitting compliant and high-quality responses within the stipulated timeframe. With a Master's Degree in English Literature, and a double major in English Literature and Education, Nilanjana has been a part of ISSI for the last seven years, and has been working in the IT industry since 2013.`,
	},
	{
		name: "Sajan Ahuja",
		role: "Director, Business Development",
		imageUrl: "/images/7.jpg",
		bio: `Sajan Ahuja is the Business Development Manager at International Software Systems, Inc., where she plays a key role in driving sales and expanding the client portfolio through strategic initiatives. With a background in Legal Studies, Sajan brings expertise in market research, customer acquisition, partner and client relationship management, and revenue growth. She has been a valuable member of the ISSI family for over four years and holds a Master's degree from Johns Hopkins University, where her thesis on immigration law has been published.`,
	},
	{
		name: "Margaret Gates",
		role: "Product Manager",
		imageUrl: "/images/8.jpg",
		bio: `Margaret Gates serves as the Product Manager at International Software Systems, Inc., where she is responsible for representing and promoting over forty software products and applications developed by ISSI. In this role, Margaret conducts research on current market trends, identifies opportunities for product development, and creates strategies for implementing and launching new products. She works closely with clients to understand their unique software requirements and guides the Product Engineering Team in developing effective solutions. Margaret's expertise is supported by her Master's Degree in International Business Management.`,
	},
];

export default function TeamGrid() {
	return (
		<section className="py-16 sm:py-24">
			<div className="mx-auto max-w-7xl px-2">
				<div className="mx-auto max-w-2xl lg:mx-0">
					<h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
						Our Experts
					</h2>
					<p className="mt-6 text-lg/8 text-gray-600">
						We’re a dynamic group of individuals who are passionate about what we
						do and dedicated to delivering the best results for our clients.
					</p>
				</div>
				<ul
					role="list"
					className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
				>
					{people.map((person) => (
						<li key={person.name}>
							<div className="flex items-center gap-x-6">
								<Image
									alt={person.name}
									src={person.imageUrl}
									width={64}
									height={64}
									className="size-16 rounded-full"
								/>
								<div>
									<h3 className="text-base/7 font-semibold tracking-tight text-gray-900">
										{person.name}
									</h3>
									<p className="text-sm/6 font-semibold text-indigo-600">
										{person.role}
									</p>
								</div>
							</div>
							<div className="mt-4 bg-gray-50 rounded-xl p-4 text-gray-700 text-sm text-justify">
								{person.bio}
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
