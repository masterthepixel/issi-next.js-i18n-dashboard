import React from "react";
import Image from "next/image";
import { FormattedMessage } from "react-intl";

const people = [
	{ id: 1, imageUrl: "/images/1.jpg" },
	{ id: 2, imageUrl: "/images/2.jpg" },
	{ id: 3, imageUrl: "/images/3.jpg" },
	{ id: 4, imageUrl: "/images/4.jpg" },
	{ id: 5, imageUrl: "/images/5.jpg" },
	{ id: 6, imageUrl: "/images/6.png" },
	{ id: 7, imageUrl: "/images/7.jpg" },
	{ id: 8, imageUrl: "/images/8.jpg" },
];

export default function TeamGrid() {
	return (
		<section className="py-16 sm:py-24">
			<div className="mx-auto max-w-7xl px-2 lg:px-4">
				<div className="mx-auto max-w-2xl lg:mx-0">
					<h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
						<FormattedMessage id="team.section.title" />
					</h2>
					<p className="mt-6 text-lg/8 text-gray-600">
						<FormattedMessage id="team.section.subtitle" />
					</p>
				</div>
				<ul
					role="list"
					className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
				>
					{people.map((person) => {
						const nameId = `team.member.${person.id}.name`;
						const roleId = `team.member.${person.id}.role`;
						const bioId = `team.member.${person.id}.bio`;
						return (
							<li key={person.id}>
								<div className="flex items-center gap-x-6">
									<Image
										alt={nameId}
										src={person.imageUrl as string}
										width={64}
										height={64}
										className="pl-4 size-16 rounded-full object-cover"
									/>
									<div>
										<h3 className="text-base/7 font-semibold tracking-tight text-gray-900">
											<FormattedMessage id={nameId} />
										</h3>
										<p className="text-sm/6 font-semibold text-indigo-600 -mt-2">
											<FormattedMessage id={roleId} />
										</p>
									</div>
								</div>
								<div className="mt-4 bg-gray-50 rounded-xl p-4 text-gray-700 text-sm text-justify">
									<FormattedMessage id={bioId} />
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
}
