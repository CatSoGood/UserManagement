import Diary from "../model/DiaryModel.js";

export const createDiary = async (req, res) => {
    try {
        const diaryData = new Diary(req.body);
        const savedDiary = await diaryData.save();
        res.status(200).json(savedDiary);
    } catch (error) {
        res.status(500).json({ error: "Internal Server error" });
    }
};

export const fetchDiaries = async (req, res) => {
    try {
        const diaries = await Diary.find();
        if (diaries.length === 0) {
            return res.status(404).json({ message: "No diaries found." });
        }
        res.status(200).json(diaries);
    } catch (error) {
        res.status(500).json({ error: "Internal Server error" });
    }
};

export const updateDiary = async (req, res) => {
    try {
        const id = req.params.id;
        const diaryExists = await Diary.findById(id);
        if (!diaryExists) {
            return res.status(400).json({ message: "Diary not found." });
        }
        const updatedDiary = await Diary.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedDiary);
    } catch (error) {
        res.status(500).json({ error: "Internal Server error" });
    }
};

export const deleteDiary = async (req, res) => {
    try {
        const id = req.params.id;
        const diaryExists = await Diary.findById(id);
        if (!diaryExists) {
            return res.status(400).json({ message: "Diary not found." });
        }
        await Diary.findByIdAndDelete(id);
        res.status(200).json({ message: "Diary deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server error" });
    }
};
