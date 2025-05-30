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
					<h2 className="text-4xl font-semibold tracking-tight text-pretty text-slate-900 dark:text-white sm:text-5xl">
						<FormattedMessage id="team.section.title" />
					</h2>
					<p className="mt-6 text-lg/8 text-slate-700 dark:text-slate-50">
						<FormattedMessage id="team.section.subtitle" />
					</p>
				</div>
				<ul
					role="list"
					className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
				>
					{people.map((person) => {
						const nameId = `team.member.${person.id}.name`;
						const roleId = `team.member.${person.id}.role`;
						const bioId = `team.member.${person.id}.bio`;
						return (
							<li key={person.id}>
								<div className="mt-4 glass-card text-left flex flex-col gap-4 w-full max-w-xl mx-auto">
									<div className="flex flex-row items-start gap-4 w-full">
										<Image
											alt={nameId}
											src={person.imageUrl as string}
											width={96}
											height={96}
											className="size-20 rounded-full object-cover shadow-md"
										/>
										<div className="flex flex-col justify-center">
											<h3 className="text-xl font-semibold tracking-snug text-slate-900 dark:text-white mt-2">
												<FormattedMessage id={nameId} />
											</h3>
											<p className="text-sm font-semibold dark:text-yellow-300 text-slate-600 -mt-1.5">
												<FormattedMessage id={roleId} />
											</p>
										</div>
									</div>
									<div className="w-full mt-2">
										<FormattedMessage id={bioId} />
									</div>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
}
