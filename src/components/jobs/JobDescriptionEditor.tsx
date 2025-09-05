"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Bold, Italic, List, ListOrdered, Link, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { JobFormData } from "@/lib/schemas/job";

interface JobDescriptionEditorProps {
  field: ControllerRenderProps<JobFormData, "jobDescription">;
}

export default function JobDescriptionEditor({ field }: JobDescriptionEditorProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [content, setContent] = useState(
    typeof field.value === "string" ? field.value : ""
  );

  // Simple markdown-like formatting functions
  const insertText = (prefix: string, suffix: string = "") => {
    const textarea = document.querySelector('textarea[name="jobDescription"]') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const beforeText = content.substring(0, start);
    const afterText = content.substring(end);

    const newText = beforeText + prefix + selectedText + suffix + afterText;
    setContent(newText);
    field.onChange(newText);

    // Reset cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  const formatBold = () => insertText("**", "**");
  const formatItalic = () => insertText("*", "*");
  const formatList = () => insertText("\n• ");
  const formatNumberedList = () => insertText("\n1. ");
  const formatLink = () => insertText("[", "](url)");

  // Simple markdown to HTML converter for preview
  const convertToHTML = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^• (.+)$/gm, '<li>$1</li>')
      .replace(/^(\d+)\. (.+)$/gm, '<li>$1. $2</li>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/\n/g, '<br />');
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    field.onChange(value);
  };

  return (
    <div className="space-y-2">
      {/* Formatting Toolbar */}
      <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-muted/20">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={formatBold}
          title="Bold (Ctrl+B)"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={formatItalic}
          title="Italic (Ctrl+I)"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <div className="h-6 w-px bg-border" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={formatList}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={formatNumberedList}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={formatLink}
          title="Link"
        >
          <Link className="h-4 w-4" />
        </Button>
        <div className="h-6 w-px bg-border" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowPreview(!showPreview)}
          title={showPreview ? "Hide Preview" : "Show Preview"}
        >
          {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>

      {/* Editor/Preview Area */}
      <div className="grid grid-cols-1 gap-4" style={{ gridTemplateColumns: showPreview ? "1fr 1fr" : "1fr" }}>
        {/* Editor */}
        <div>
          <Textarea
            name="jobDescription"
            placeholder="Describe the job role, responsibilities, requirements, and what makes this opportunity exciting..."
            value={content}
            onChange={(e) => handleContentChange(e.target.value)}
            className="min-h-[200px] resize-y"
          />
          <div className="mt-1 text-xs text-muted-foreground">
            Tip: Use **bold**, *italic*, • lists, 1. numbered lists, [links](url)
          </div>
        </div>

        {/* Preview */}
        {showPreview && (
          <div className="border rounded-md p-3 bg-muted/10">
            <h4 className="text-sm font-medium mb-2">Preview</h4>
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{
                __html: convertToHTML(content) || "<p className='text-muted-foreground'>Preview will appear here...</p>"
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}