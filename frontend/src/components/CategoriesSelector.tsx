import { useState, ChangeEvent, FC } from "react"

type CategoriesSelectorProps = {
    categories: string[];
    setSelectedCategory: (category: string) => void;
};

const CategoriesSelector: FC<CategoriesSelectorProps> = ({categories, setSelectedCategory}) => {
    const [selectedValue, setSelectedValue] = useState<string>('');

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value);
        setSelectedCategory(event.target.value);
    };

    return (
        <div className="h-5vh flex justify-end">
            <select 
                value={selectedValue} 
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                <option value="">Select a category</option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
            </select>
        </div>
    );
}

export default CategoriesSelector