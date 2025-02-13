"use client"

import * as React from "react"
import {Trash2, Upload} from "lucide-react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface FileUploadProps {
    className?: string
}

export const FileUploader  = ({ className }: FileUploadProps) => {
    const [files, setFiles] = React.useState<File[]>([])

    const onDrop = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const droppedFiles = Array.from(e.dataTransfer.files)
        setFiles((prev) => [...prev, ...droppedFiles])
    }, [])

    const onFileSelect = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files)
            setFiles((prev) => [...prev, ...selectedFiles])
        }
    }, [])

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index))
    }

    return (
        <div className={cn("space-y-4", className)}>
            <div
                onDrop={onDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors"
            >
                <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={onFileSelect}
                    multiple
                    accept=".svg,.png,.jpg,.gif"
                />
                <label htmlFor="file-upload" className="cursor-pointer block">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <div className="text-sm text-muted-foreground mb-2">Tải ảnh lên</div>
                    <div className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (max. 800×400px)</div>
                </label>
            </div>

            {files.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {files.map((file, index) => (
                        <Card key={index} className="overflow-hidden">
                            <CardContent className="p-3">
                                <div className="flex items-center gap-3">
                                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
                                        {file.type.startsWith("image/") ? (
                                            <Image
                                                src={URL.createObjectURL(file) || "/placeholder.svg"}
                                                alt={file.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="h-full w-full bg-muted flex items-center justify-center">
                                                <Upload className="h-6 w-6 text-muted-foreground" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{file.name}</p>
                                        <p className="text-sm text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(1)} MB</p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="shrink-0 w-8 h-8 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full"
                                        onClick={() => removeFile(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}

