"use client"
import { FC, useMemo, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { StartCode } from "@/lib/models/startCode"
import StartCodePopup from "./startCodePopup"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Search } from 'lucide-react'
import { deleteStartCode } from "@/lib/server/actions/startCodeActions"
import { FullExercise } from "@/lib/models/exercise"

interface Props {
    startCodes: StartCode[]
    exercises: FullExercise[]
}

interface GroupedStartCodes {
    [exerciseId: string]: {
        exerciseTitle: string,
        startCodes: StartCode[]
    }
}

const StartCodeList: FC<Props> = ({ startCodes, exercises }) => {
    console.log(startCodes)

    const [searchTerm, setSearchTerm] = useState<string>("")

    //Use memo zorgt er voor dat de exercises gecached worden. Ze worden nu enkel opnieuw ingeladen als 'startCodes' veranderd.
    const groupedStartCodes = useMemo(() => {
        const grouped = startCodes.reduce<GroupedStartCodes>((acc, startCode) => {
            if (!acc[startCode.exercise.id]) {
                acc[startCode.exercise.id] = {
                    exerciseTitle: startCode.exercise.title,
                    startCodes: []
                }
            }
            acc[startCode.exercise.id].startCodes.push(startCode)
            return acc
        }, {})

        // Voeg oefeningen zonder startcodes toe
        exercises.forEach((exercise) => {
            if (!grouped[exercise.id]) {
                grouped[exercise.id] = {
                    exerciseTitle: exercise.title,
                    startCodes: []
                }
            }
        })

        return grouped
    }, [startCodes, exercises])

    const filteredGroupedStartCodes = useMemo(() => {
        if (!searchTerm) return groupedStartCodes
        return Object.entries(groupedStartCodes).reduce<GroupedStartCodes>((acc, [exerciseId, data]) => {
            if (data.exerciseTitle.toLowerCase().includes(searchTerm.toLowerCase())) {
                acc[exerciseId] = data
            }
            return acc
        }, {})
    }, [groupedStartCodes, searchTerm])

    const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }, [])

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search exercises..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="pl-8"
                    />
                </div>
            </div>
            {Object.entries(filteredGroupedStartCodes).map(([exerciseId, { exerciseTitle, startCodes }]) => (
                <Card key={exerciseId}>
                    <CardHeader>
                        <CardTitle>{exerciseTitle}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4">
                            {
                                startCodes.length !== 4 && (
                                    <Button asChild>
                                        <Link href={`startcode/new/${exerciseId}`}>
                                            Add new startcode to this exercise
                                        </Link>
                                    </Button>
                                )
                            }

                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Id</TableHead>
                                    <TableHead>Language</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {startCodes.map((startCode) => (
                                    <TableRow key={startCode.id}>
                                        <TableCell>{startCode.id}</TableCell>
                                        <TableCell>{startCode.type}</TableCell>
                                        <TableCell>
                                            <StartCodePopup startCode={startCode} />
                                            <Button className="m-1" asChild>
                                                <Link href={`/admin/startcode/update/${startCode.id}`}>
                                                    Update
                                                </Link>
                                            </Button>
                                            <Button className="m-1" onClick={() => deleteStartCode(startCode.id)} >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default StartCodeList

