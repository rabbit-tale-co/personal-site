import type * as React from "react";
import {
	useRef,
	useEffect,
	forwardRef,
	useImperativeHandle,
	useState,
	useCallback,
} from "react";
import { HexColorPicker } from "react-colorful";
import Button from "./Button";
import { OutlineBrush, OutlineRedo, OutlineUndo } from "icons/Icons";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Tooltip from "./Tooltip";
import { cn } from "utils/tw";

export interface DrawingCanvasRef {
	getDataURL: () => string;
	clearCanvas: () => void;
}

const DrawingCanvas = forwardRef<DrawingCanvasRef>((_, ref) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const contextRef = useRef<CanvasRenderingContext2D | null>(null);
	const isDrawingRef = useRef(false);
	const [color, setColor] = useState("#000000");
	const [history, setHistory] = useState<string[]>([]);
	const [historyIndex, setHistoryIndex] = useState(-1);

	useImperativeHandle(ref, () => ({
		getDataURL: () => canvasRef.current?.toDataURL() || "",
		clearCanvas,
	}));

	// Initialize canvas
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		canvas.width = canvas.offsetWidth;
		canvas.height = 256;

		const context = canvas.getContext("2d");
		if (context) {
			context.lineWidth = 2;
			context.lineCap = "round";
			contextRef.current = context;
		}
	}, []);

	// Update stroke color
	useEffect(() => {
		if (contextRef.current) {
			contextRef.current.strokeStyle = color;
		}
	}, [color]);

	const getMousePosition = useCallback(
		(
			event:
				| React.MouseEvent<HTMLCanvasElement>
				| React.TouchEvent<HTMLCanvasElement>,
		) => {
			const canvas = canvasRef.current;
			if (!canvas) return { offsetX: 0, offsetY: 0 };

			const rect = canvas.getBoundingClientRect();
			let offsetX = 0;
			let offsetY = 0;

			if (event.type.startsWith("mouse")) {
				const { clientX, clientY } = (event as React.MouseEvent).nativeEvent;
				offsetX = clientX - rect.left;
				offsetY = clientY - rect.top;
			} else if (event.type.startsWith("touch")) {
				const { clientX, clientY } = (event as React.TouchEvent).touches[0];
				offsetX = clientX - rect.left;
				offsetY = clientY - rect.top;
			}

			return { offsetX, offsetY };
		},
		[],
	);

	const startDrawing = useCallback(
		(
			event:
				| React.MouseEvent<HTMLCanvasElement>
				| React.TouchEvent<HTMLCanvasElement>,
		) => {
			event.preventDefault();
			isDrawingRef.current = true;
			const { offsetX, offsetY } = getMousePosition(event);
			contextRef.current?.beginPath();
			contextRef.current?.moveTo(offsetX, offsetY);
		},
		[getMousePosition],
	);

	const draw = useCallback(
		(
			event:
				| React.MouseEvent<HTMLCanvasElement>
				| React.TouchEvent<HTMLCanvasElement>,
		) => {
			if (!isDrawingRef.current) return;
			const { offsetX, offsetY } = getMousePosition(event);
			contextRef.current?.lineTo(offsetX, offsetY);
			contextRef.current?.stroke();
		},
		[getMousePosition],
	);

	const stopDrawing = useCallback(
		(event: React.MouseEvent | React.TouchEvent) => {
			event.preventDefault();
			if (!isDrawingRef.current) return;

			isDrawingRef.current = false;
			contextRef.current?.closePath();

			if (canvasRef.current) {
				const dataURL = canvasRef.current.toDataURL();
				const newHistory = history.slice(0, historyIndex + 1);
				setHistory([...newHistory, dataURL]);
				setHistoryIndex(newHistory.length);
			}
		},
		[history, historyIndex],
	);

	const clearCanvas = useCallback(() => {
		const canvas = canvasRef.current;
		const context = contextRef.current;
		if (canvas && context) {
			context.clearRect(0, 0, canvas.width, canvas.height);
		}
	}, []);

	const handleClear = useCallback(() => {
		clearCanvas();
		setHistory([]);
		setHistoryIndex(-1);
	}, [clearCanvas]);

	const handleStepBack = useCallback(() => {
		if (historyIndex > 0) {
			const newIndex = historyIndex - 1;
			clearCanvas();
			const img = new Image();
			img.src = history[newIndex];
			img.onload = () => contextRef.current?.drawImage(img, 0, 0);
			setHistoryIndex(newIndex);
		} else if (historyIndex === 0) {
			clearCanvas();
			setHistoryIndex(-1);
		}
	}, [historyIndex, history, clearCanvas]);

	const handleStepForward = useCallback(() => {
		if (historyIndex < history.length - 1) {
			const newIndex = historyIndex + 1;
			clearCanvas();
			const img = new Image();
			img.src = history[newIndex];
			img.onload = () => contextRef.current?.drawImage(img, 0, 0);
			setHistoryIndex(newIndex);
		}
	}, [historyIndex, history, clearCanvas]);

	return (
		<div className="flex flex-col gap-2">
			<canvas
				ref={canvasRef}
				onMouseDown={startDrawing}
				onMouseMove={draw}
				onMouseUp={stopDrawing}
				onMouseLeave={stopDrawing}
				onTouchStart={startDrawing}
				onTouchMove={draw}
				onTouchEnd={stopDrawing}
				className="w-full h-64 border border-gray-300 rounded-lg"
			/>
			<div className="flex gap-2">
				<div className="flex w-full">
					<Button
						type="button"
						title="Clear canvas"
						onClick={handleClear}
						variant="danger"
						disabled={historyIndex < 0}
					/>
				</div>
				<div className={cn("group/tooltip relative delay-100")}>
					<Tooltip text="Undo" />
					<Button
						title="Undo"
						variant="dimmed"
						size="icon"
						onClick={handleStepBack}
						disabled={historyIndex < 0}
					>
						<OutlineUndo size={20} />
					</Button>
				</div>
				<div className={cn("group/tooltip relative delay-100")}>
					<Tooltip text="Redo" />
					<Button
						title="Redo"
						variant="dimmed"
						size="icon"
						onClick={handleStepForward}
						disabled={historyIndex >= history.length - 1}
					>
						<OutlineRedo size={20} />
					</Button>
				</div>
				<Popover>
					<PopoverTrigger asChild>
						<div className={cn("group/tooltip relative delay-100")}>
							<Tooltip text="Color" />
							<Button title="Color" variant="dimmed" size="icon">
								<OutlineBrush size={20} />
							</Button>
						</div>
					</PopoverTrigger>
					<PopoverContent sideOffset={12} align="end" className="w-fit">
						<HexColorPicker color={color} onChange={setColor} />
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
});

export default DrawingCanvas;
