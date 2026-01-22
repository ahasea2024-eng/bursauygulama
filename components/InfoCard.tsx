import React from 'react';
import { ContentItem } from '../types';

interface InfoCardProps {
  item: ContentItem;
}

export const InfoCard: React.FC<InfoCardProps> = ({ item }) => {
  return (
    <div className={`w-full mb-6 overflow-hidden rounded-3xl shadow-sm ${item.bgColor} transition-transform duration-300 hover:scale-[1.01]`}>
      <div className="relative h-48 w-full">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${item.badgeColor} ${item.textColor} bg-opacity-90 backdrop-blur-sm shadow-sm`}>
            {item.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className={`text-xl font-bold mb-2 ${item.textColor}`}>
          {item.title}
        </h3>
        <p className={`text-sm leading-relaxed ${item.textColor} opacity-90 font-medium`}>
          {item.description}
        </p>
      </div>
    </div>
  );
};