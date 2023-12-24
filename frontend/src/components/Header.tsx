const Header = () => {
  return (    
    <header className="bg-gray-800 text-white body-font h-10vh">
        <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
            <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                <img src="src/assets/rocket.svg" alt='rocket'/>
                <span className="ml-3 text-xl">Notes app</span>
            </a>
        </div>
    </header>
  )
}

export default Header