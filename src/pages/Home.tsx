import {Card} from "../components/ui/card.tsx";
import {Tractor, Users, Leaf, Axe} from "lucide-react";
import {motion} from "framer-motion";
import Calendar from "react-calendar";
import {useState} from "react";
import 'react-calendar/dist/Calendar.css';

export default function Home() {
    const [date, setDate] = useState(new Date());
    return (
        <>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                {/* Crop Fields */}
                <motion.div whileHover={{scale: 1.05}}>
                    <Card>
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-lg font-bold">Crop Fields</h2>
                                <p className="text-gray-700">Manage and monitor fields</p>
                            </div>
                            <Leaf className="text-green-600" size={32}/>
                        </div>
                    </Card>
                </motion.div>

                {/* Equipment */}
                <motion.div whileHover={{scale: 1.05}}>
                    <Card>
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-lg font-bold">Equipment</h2>
                                <p className="text-gray-700">Track and maintain tools</p>
                            </div>
                            <Axe className="text-yellow-600" size={32}/>
                        </div>
                    </Card>
                </motion.div>

                {/* Vehicles */}
                <motion.div whileHover={{scale: 1.05}}>
                    <Card>
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-lg font-bold">Vehicles</h2>
                                <p className="text-gray-700">Manage fleet operations</p>
                            </div>
                            <Tractor className="text-yellow-600" size={32}/>
                        </div>
                    </Card>
                </motion.div>

                {/* Staff */}
                <motion.div whileHover={{scale: 1.05}}>
                    <Card>
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-lg font-bold">Staff</h2>
                                <p className="text-gray-700">Monitor and assign tasks</p>
                            </div>
                            <Users className="text-red-600" size={32}/>
                        </div>
                    </Card>
                </motion.div>

                <motion.div whileHover={{scale: 1.05}}>
                    <div className="lg:col-span-1 col-span-2 lg:col-start-1 p-6 flex justify-center mt-8">
                        <Card className="p-4 shadow-lg rounded-xl">
                            <h2 className="text-lg font-bold mb-4">Schedule & Events</h2>
                            <Calendar
                                onChange={setDate}
                                value={date}
                                className="rounded-lg shadow-md"
                            />
                        </Card>
                    </div>
                </motion.div>
            </div>

        </>

    );
}
