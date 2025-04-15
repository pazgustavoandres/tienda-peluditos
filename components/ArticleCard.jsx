import React from 'react';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  const { title, date, image, category, excerpt, slug, author } = article;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-primary text-white text-xs font-semibold px-2 py-1 rounded">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center text-gray-500 text-xs mb-2">
          <div className="flex items-center mr-4">
            <FiCalendar className="mr-1" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <FiUser className="mr-1" />
            <span>{author}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors">
          <Link to={`/blog/${slug}`}>{title}</Link>
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {excerpt}
        </p>
        
        <Link 
          to={`/blog/${slug}`}
          className="text-primary font-medium text-sm hover:underline"
        >
          Leer más
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard; 