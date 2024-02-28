import NotFoundImage from '../assets/404.jpg';

function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <img src={NotFoundImage} alt="404" className='w-4/5 md:w-1/4 rounded-lg shadow-md shadow-black mb-4' />
            <h1 className="text-4xl leading-tight font-bold text-gray-900 dark:text-white">404 - Not Found</h1>
        </div>
    );
}

export default NotFound;