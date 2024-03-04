import { Link } from 'react-router-dom';

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

const NextPrevButtons = ({ id }) => {
    return (
        <div className="flex flex-row items-center justify-between w-full mb-5">
            <Link to={`/pokemon/${((Number(id) - 1) < 1) ? 1010 : (Number(id) - 1)}`}>
                <Button variant="outline"  className="text-gray-400 w-fit hover:text-gray-200 bg-[#050911] border-[#373A41] hover:bg-[#0a111d] gap-x-2">
                    <ChevronLeftIcon/>
                    Prev
                </Button>
            </Link>
            <Link to={`/pokemon/${((Number(id) + 1) > 1010) ? 1 : (Number(id) + 1)}`}>
                <Button variant="outline"  className="text-gray-400 w-fit hover:text-gray-200 bg-[#050911] border-[#373A41] hover:bg-[#0a111d] gap-x-2">
                    Next
                    <ChevronRightIcon/>
                </Button>
            </Link>
        </div>
    )
}

export default NextPrevButtons;