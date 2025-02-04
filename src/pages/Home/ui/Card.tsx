import { CardProps } from '../propTypes';

const Card = ({ title, subtitle, Icon, href }: CardProps): JSX.Element => {
  return (
    <a
      href={href}
      className="group relative w-full overflow-hidden rounded border-[1px] border-slate-300 bg-white p-4"
    >
      <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-violet-600 to-indigo-600 transition-transform duration-300 group-hover:translate-y-[0%]" />

      <Icon className="absolute -top-12 -right-12 z-10 text-9xl text-slate-100 transition-transform duration-300 group-hover:rotate-12 group-hover:text-violet-400" />
      <Icon className="relative z-10 mb-2 text-2xl text-violet-600 transition-colors duration-300 group-hover:text-white" />
      <h3 className="relative z-10 text-lg font-medium text-slate-950 duration-300 group-hover:text-white">
        {title}
      </h3>
      <p className="relative z-10 text-slate-400 duration-300 group-hover:text-violet-200">
        {subtitle}
      </p>
    </a>
  );
};

export default Card;
