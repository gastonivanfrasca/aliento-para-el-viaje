"use client"

type InformationProps = {
    title: string,
    description: string,
    actions: {
        component: React.ReactNode,
        link: string,
    }[]
}

const Information = (props: InformationProps) => {
    const { title, description, actions } = props;
    return (
        <div className="mb-4 md:mb-16">
            <h2 className='mb-2 font-bold text-xl'>{title}</h2>
            <p className='mb-4 text-lg'>{description}</p>
            <div className='flex flex-row gap-8'>
                {actions.map((action, index) => (
                    <button key={index} onClick={() => window.open(action.link, '_blank')} className='bg-transparent cursor-pointer'>{action.component}</button>
                ))}
            </div>
        </div>
    )
}
export default Information;