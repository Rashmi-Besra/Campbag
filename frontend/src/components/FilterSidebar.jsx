import React from "react";

const FilterSidebar=({
    filterVisible,
    setFilterVisible,
    selectedColors,
    toggleColor,
    sortType,
    setsortType
})=>{
    return(
        <>
        {/*BACKGROUND OVERLAY*/}
        {
            filterVisible && (

                <div className='fixed inset-0 bg-black/40 z-40'
                onClick={() => setFilterVisible(false)}
                >

                </div>
            )
        }

        {/*sidebar*/}
        <div className={`fixed top-0 right-0 h-screen w-80 bg-white z-50 shadow-xl transition-transform duration-300 overflow-y-auto
            ${filterVisible ? "translate-x-0": "translate-x-full"} `}>
                {/*Header*/}

                <div className="flex justify-between items-center p-5 border-b">
                    <p className="text-xl font-medium">Filters</p>
                    <button onClick={()=>
                        setFilterVisible(false)}
                        className='text-xl'>X</button>
                </div>

                {/*colorFilter*/}

                <div className="p-5 border-b">
                    <p className="font-medium mb-4">
                        Colors
                        </p>
                        <div className="flex flex-col gap-3 text-sm">
                            <label className="flex gap-2">
                                <input type="checkbox"
                                checked={selectedColors.includes("black")}
                                onChange={()=>
                                    toggleColor("black")
                                } />
                                Black
                            </label>

                           <label className="flex gap-2">
                                <input type="checkbox"
                                checked={selectedColors.includes("white")}
                                onChange={()=>
                                    toggleColor("white")
                                } />
                                White
                            </label>

                            <label className="flex gap-2">
                                <input type="checkbox"
                                checked={selectedColors.includes("Blue")}
                                onChange={()=>
                                    toggleColor("Blue")
                                } />
                                Blue
                            </label>

                            <label className="flex gap-2">
                                <input type="checkbox"
                                checked={selectedColors.includes("Brown")}
                                onChange={()=>
                                    toggleColor("Brown")
                                } />
                                Brown
                            </label>

                            <label className="flex gap-2">
                                <input type="checkbox"
                                checked={selectedColors.includes("Red")}
                                onChange={()=>
                                    toggleColor("Red")
                                } />
                                Red
                            </label>

                            <label className="flex gap-2">
                                <input type="checkbox"
                                checked={selectedColors.includes("Pink")}
                                onChange={()=>
                                    toggleColor("Pink")
                                } />
                                Pink
                            </label>


                        </div>
                        </div> 

                        {/*SORT FILTER */}

                        <div className="p-5">
                            <p className="font-medium mb-4">Sort By</p>
                            <select value={sortType}
                            onChange={(e) =>
                                setsortType(e.target.value)
                            }
                            className="border px-3 py-2 w-full">

                                <option value="relevant">Relevant</option>
                                <option value="Low-High">Price:Low-High</option>
                                <option value="High-Low">Price:High-Low</option>
                            </select>
                        </div>
        </div>

        </>
    )
}

export default FilterSidebar