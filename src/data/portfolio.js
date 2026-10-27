// Single source of truth for portfolio content (projects, papers, profile).
// Sourced from github.com/lucky07-07 repositories.

const GH = "https://github.com/lucky07-07";

export const profile = {
    name: "Anil Kumar",
    role: "AI / ML Engineer",
    tagline: "Deep Learning · Computer Vision · LLMs · Agents",
    email: "anilkumarlucky07@gmail.com",
    github: GH,
    linkedin: "https://www.linkedin.com/in/anil-kumar-29884a17a/",
    resume: "/resume.pdf",
};

// Domain filters used on the Projects page.
export const domains = [
    { id: "all",    label: "All" },
    { id: "cv",     label: "Computer Vision" },
    { id: "nlp",    label: "NLP & LLMs" },
    { id: "agents", label: "Agents & Systems" },
    { id: "data",   label: "Applied ML & Analytics" },
];

export const projects = [
    {
        title: "Knee MRI Abnormality Detection",
        domain: "cv",
        featured: true,
        metric: { value: "0.906", label: "private AUC · RSNA Kaggle" },
        description:
            "Multi-label detection of 12 knee abnormalities from multi-series MRI, trained on labels an LLM extracted from multilingual radiology reports. 2.5D ConvNeXt with cross-series attention.",
        problemStatement:
            "Of 4,407 training studies (≈820K DICOM files, 570 GB), only 58 carry radiologist image labels. The rest have only free-text reports written in about ten languages, and the test set has no reports at all, so predictions must come from the images alone.",
        approach:
            "Qwen2.5-14B-Instruct (4-bit) grades every report 0–3 per finding, using grade-token probabilities as a continuous expected grade; these are calibrated on the gold studies and blended per finding with a rule-based labeler and teacher predictions. KneeNet turns every 3-slice window of every series into a token through a shared ConvNeXt-T, adds slot and depth embeddings, mixes them with a transformer layer and pools with 12 per-finding attention heads. 3 views × 5 folds = 15 models with TTA and rank-averaging, fully offline.",
        results:
            "Macro ROC-AUC 0.906 on the Kaggle private leaderboard (6,425 teams) and 0.907 on 58 radiologist-labelled gold studies. Label quality against gold rose from 0.71 (rules) to 0.88 (LLM) to 0.93 (blend). Labels were the bottleneck, not the backbone.",
        tech: ["PyTorch", "ConvNeXt", "Transformers", "Qwen2.5-14B", "timm", "DICOM", "Kaggle"],
        links: { github: `${GH}/knee-mri-abnormality-detection` },
    },
    {
        title: "AgroVision-7",
        domain: "cv",
        featured: true,
        metric: { value: "97.48%", label: "accuracy · 0.975 macro-F1" },
        description:
            "A deep-learning study that classifies seven rice leaf conditions from RGB photographs, from a weak imbalanced baseline to an Optuna-tuned, test-time-augmented transformer ensemble.",
        problemStatement:
            "Rice leaf diseases reduce yield and income, yet manual diagnosis is slow and needs experts. Public datasets are small and class-imbalanced, and diseases such as Rice Blast, Leaf scald and Rice Tungro are fine-grained and easily confused.",
        approach:
            "Imbalance-aware training (WeightedRandomSampler + class-weighted Focal Loss), Optuna TPE search on a ConvNeXt-Tiny proxy and two-stage transfer learning. Five experiment families are benchmarked on a common split, ending in ×5 TTA and an accuracy-weighted ensemble of ViT-B/16 (SWAG), Swin-T and ConvNeXt-Tiny.",
        results:
            "The ensemble reaches 97.48 % test accuracy and 0.9750 macro-F1, with every per-class accuracy ≥ 0.96. ConvNeXt-Tiny alone hits 96.60 % at about a third of the cost. A pre-augmented dataset with a weighted sampler lifted ResNet-50 from 76.53 % to 93.76 %.",
        tech: ["PyTorch", "ViT-B/16", "Swin-T", "ConvNeXt", "Optuna", "Grad-CAM", "Focal Loss", "timm"],
        links: {
            github: `${GH}/rice-leaf-disease-classification`,
            paper: `${GH}/rice-leaf-disease-classification/blob/main/docs/main.pdf`,
        },
    },
    {
        title: "KIC-COCO · Kannada Image Captioning",
        domain: "nlp",
        featured: true,
        metric: { value: "250K", label: "Kannada captions · 6 models" },
        description:
            "The first MS COCO-scale Kannada image-caption dataset, with a benchmark of six CNN-RNN and transformer encoder-decoder architectures. Paper under review at ICMLDE 2026.",
        problemStatement:
            "Kannada has over 60 million speakers but almost no multimodal resources. Earlier Kannada captioning used small, non-standard datasets, and word-level metrics such as BLEU are poorly calibrated for agglutinative languages.",
        approach:
            "MS COCO 2017 captions were translated to Kannada with IndicTrans2-1B. Six encoder-decoder models were trained end to end with teacher forcing, AdamW, cosine annealing and label smoothing, then evaluated with character-level SacreBLEU, chrF, METEOR, CIDEr and back-translation BERTScore.",
        results:
            "250,000 captions across 50,000 images with fixed splits. The best model, ConvNeXtTransformer, reaches character-level SacreBLEU-4 of 68.65 and back-translation BERTScore of 84.02. Word-level BLEU-4 over prior Kannada work improved from 7.26 to 43.57.",
        tech: ["PyTorch", "CLIP", "ConvNeXt", "ViT", "IndicTrans2", "IndicBART", "BERTScore"],
        links: {
            github: `${GH}/KIC-COCO-Kannada-Image-Captioning`,
            paper: `${GH}/KIC-COCO-Kannada-Image-Captioning/blob/main/paper/paper.md`,
        },
    },
    {
        title: "Sentient",
        domain: "agents",
        metric: { value: "8", label: "live sources · self-verifying" },
        description:
            "“The AI that watches AI — and audits itself.” A self-running intelligence terminal that monitors the AI ecosystem and publishes a grounded daily briefing through a draft → verify → revise agent loop.",
        problemStatement:
            "Keeping up with AI research, open source, markets and company blogs means sifting huge volumes of noisy updates, and LLM summaries of them tend to hallucinate or cite claims that cannot be traced.",
        approach:
            "Eight sources (arXiv, GitHub, HuggingFace, Papers With Code, Reddit, GDELT, RSS, stocks) are chunked, embedded with Gemini and stored in LanceDB. For each topic an agent on Groq qwen3-32b retrieves the top chunks, drafts with tool calls, and hands the draft to a critic that checks every claim; failing sections are revised up to three times. A meta-agent then patches the agent's own constitution after each run.",
        results:
            "Agentic, self-reflective RAG with inline citations and verification reports. Delivered as a Bloomberg-style live dashboard with a knowledge graph, a neural decision visualizer and an analyst chat.",
        tech: ["Next.js", "TypeScript", "LLM Agents", "RAG", "LanceDB", "Groq", "D3.js"],
        links: { github: `${GH}/sentient` },
    },
    {
        title: "SustainSched · Carbon-Aware K8s Agent",
        domain: "agents",
        metric: { value: "R² 0.917", label: "carbon forecast · XGBoost" },
        description:
            "A lightweight autonomous AI agent that schedules Kubernetes workloads with explicit awareness of regional grid carbon intensity.",
        problemStatement:
            "Most Kubernetes schedulers optimise only for CPU and memory, but grid carbon intensity varies by hour and region, so the same job can emit several times less CO₂ at a cleaner time or place.",
        approach:
            "An XGBoost forecaster (chosen against LSTM and GRU) is combined with live data from the UK Carbon Intensity API, a local Llama 3.2 3B on Ollama for explainable reasoning, and a LangGraph agent that ranks fourteen UK regions and emits transparent decisions, persisted to SQLite and exposed through Prometheus and Grafana.",
        results:
            "XGBoost won on the held-out set with MAE 7.16 and R² 0.917 (GRU 0.890, LSTM 0.854). The agent emits deploy / delay / migrate / rebalance actions and runs on a laptop-class RTX 2060.",
        tech: ["LangGraph", "Ollama", "Llama 3.2", "XGBoost", "Kubernetes", "FastAPI", "Prometheus"],
        links: {
            github: `${GH}/autonomous-carbon-k8s-scheduler`,
            paper: `${GH}/autonomous-carbon-k8s-scheduler/tree/main/paper`,
        },
    },
    {
        title: "Geospatial Monitoring System",
        domain: "agents",
        metric: { value: "1.5K+", label: "aircraft tracked live" },
        description:
            "A real-time geospatial intelligence platform tracking satellites, aircraft and weather, streamed through Kafka into PostGIS, with predictive ML and a Spark analytics layer.",
        problemStatement:
            "Situational awareness across satellites, aircraft and weather usually means stitching together separate tools. The challenge is to ingest all three live, map them to one telemetry model and serve prediction and analytics at scale.",
        approach:
            "Public APIs (CelesTrak, OpenSky, Open-Meteo, RainViewer) feed a canonical telemetry envelope on Kafka. FastAPI persists to PostgreSQL/PostGIS and fans out over WebSocket to a React/Cesium dashboard. An ML service publishes forecasts, anomalies and conjunction screening, and PySpark runs streaming aggregation, KMeans hotspots and XGBoost risk forecasting.",
        results:
            "A live snapshot ingested 126 satellites, 1,512 aircraft and 6 weather sources per cycle, publishing 100 satellite and 459 aircraft forecasts. All six ML tasks run on physics/statistical baselines, with deep models ready to auto-upgrade once trained.",
        tech: ["Kafka", "PySpark", "PyTorch", "FastAPI", "PostGIS", "React", "Docker"],
        links: {
            github: `${GH}/geospatial-monitoring-system`,
            demo: `${GH}/geospatial-monitoring-system/blob/main/docs/demo.gif`,
        },
    },
    {
        title: "COD Return-Risk Scorer",
        domain: "data",
        metric: { value: "₹29.5K", label: "saved per 10K orders" },
        description:
            "Cost-sensitive return-to-origin risk scorer for Indian cash-on-delivery orders. CatBoost + SHAP served with FastAPI, leakage-controlled and time-aware. Razorpay AI Buildathon 2026.",
        problemStatement:
            "About 1 in 4 cash-on-delivery orders in India is never delivered, and the seller pays shipping both ways while collecting nothing: an estimated ₹8,000 crore a year.",
        approach:
            "Eleven models were compared against logistic regression with paired bootstrap confidence intervals. The decision threshold is set by rupee cost rather than at 0.5, and every prediction ships with SHAP reasons and a plain-English action: allow COD, add a fee, or ask for prepayment.",
        results:
            "On 10,000 unseen orders the model saves ₹29,481 against the best no-model policy, at ROC-AUC 0.806 and PR-AUC 2.6× the no-skill floor. The cost-optimal threshold of 0.37 is worth ₹20,835 over a habitual 0.5 cut-off.",
        tech: ["CatBoost", "SHAP", "scikit-learn", "FastAPI", "Docker", "pytest"],
        links: {
            github: `${GH}/rto-return-risk-scorer`,
            demo: "https://cod-return-risk-scorer.onrender.com/",
        },
    },
    {
        title: "EV Battery Analytics",
        domain: "data",
        metric: { value: "2.1%", label: "SoC error · R² 0.96" },
        description:
            "End-to-end data and AI pipeline on 70 real BMW i3 drives (1.09M samples): state-of-charge estimation, energy prediction, anomaly detection, Power BI and a local LLM assistant.",
        problemStatement:
            "Raw 10 Hz vehicle logs are noisy and inconsistent between seasons, yet they hold the answers to practical questions: how much charge is left, what a trip will cost in energy, and why winter drives cost more.",
        approach:
            "A DuckDB warehouse with logged data-quality fixes, signal processing for voltage-sag resistance, an 8-model benchmark with trip-grouped cross-validation and a stacked ensemble, four anomaly detectors, a Power BI project generated as code, and a local RAG + text-to-SQL assistant on Ollama.",
        results:
            "The stacked virtual SoC sensor reaches 2.1 % mean error (R² 0.96) on 14 unseen trips. Winter trips use 43 % more energy per km. The assistant refuses 100 % of out-of-scope questions.",
        tech: ["XGBoost", "LightGBM", "Optuna", "DuckDB", "Power BI", "Ollama", "RAG"],
        links: { github: `${GH}/ev-battery-analytics` },
    },
    {
        title: "AppealIQ · Health-Plan Appeals",
        domain: "data",
        metric: { value: "90.5%", label: "overturn rate · top-risk decile" },
        description:
            "Power BI, ML, NLP and anomaly detection on 42,710 real California Independent Medical Review decisions: which health-plan denials get overturned.",
        problemStatement:
            "Health plans need to know which treatment denials are likely to be overturned on independent review, whether that is changing, and which cases look unusual enough for a human to check.",
        approach:
            "A time-split overturn-risk model using only pre-review fields (7 algorithms + stacked ensemble, SHAP, calibration, subgroup checks), TF-IDF + linear SVM routing of reviewer text, and robust z-score / Isolation Forest / binomial control-limit anomaly detection, feeding a Power BI project generated from Python.",
        results:
            "ROC-AUC 0.736 on unseen 2024+ years against 0.612 for a historical-rate baseline. The top 10 % riskiest denials were overturned 90.5 % of the time. NLP routing reaches 89.1 % accuracy across 13 categories.",
        tech: ["scikit-learn", "SHAP", "NLP", "Isolation Forest", "DuckDB", "Power BI"],
        links: { github: `${GH}/appealiq-health-plan-appeals-analytics` },
    },
];

// Research papers (with thesis / poster where available).
export const papers = [
    {
        title: "Wildfire Occurrence Analysis Using Meteorological Data: A Comparative Study of Statistical Methods and Learning Models",
        venue: "ICICT 2026 · 9th Int. Conf. on Inventive Computation Technologies",
        status: "Published",
        year: "2026",
        area: "Applied ML · Climate",
        summary:
            "Compares classical statistical methods with machine-learning models for predicting wildfire occurrence from meteorological variables.",
        links: [],
    },
    {
        title: "KIC-COCO: A Benchmark Dataset for Kannada Image Captioning and Architecture Comparison",
        venue: "ICMLDE 2026 · 5th Int. Conf. on Machine Learning and Data Engineering",
        status: "Under review",
        year: "2026",
        area: "Multimodal NLP",
        summary:
            "Introduces a 250K-caption Kannada benchmark built from MS COCO 2017 and evaluates six encoder-decoder architectures plus two zero-shot multilingual VLMs.",
        links: [
            { label: "Paper", href: `${GH}/KIC-COCO-Kannada-Image-Captioning/blob/main/paper/paper.md` },
            { label: "Code", href: `${GH}/KIC-COCO-Kannada-Image-Captioning` },
        ],
    },
    {
        title: "AgroVision-7: Lightweight Deep Learning for Fine-Grained Rice Leaf Disease Recognition",
        venue: "IEEE-format conference paper · M.Tech thesis",
        status: "Preprint",
        year: "2026",
        area: "Computer Vision",
        summary:
            "Imbalance-aware transfer learning and a TTA transformer ensemble for 7-class rice leaf disease recognition at 97.48 % accuracy.",
        links: [
            { label: "Paper PDF", href: `${GH}/rice-leaf-disease-classification/blob/main/docs/main.pdf` },
            { label: "Thesis", href: `${GH}/rice-leaf-disease-classification/blob/main/docs/thesis.pdf` },
            { label: "Poster", href: `${GH}/rice-leaf-disease-classification/blob/main/docs/poster/poster.pdf` },
            { label: "Code", href: `${GH}/rice-leaf-disease-classification` },
        ],
    },
    {
        title: "SustainSched: An Autonomous Agent for Carbon-Aware Kubernetes Scheduling",
        venue: "IEEE-format paper",
        status: "Manuscript",
        year: "2026",
        area: "LLM Agents · Green AI",
        summary:
            "Couples an XGBoost carbon-intensity forecaster with a LangGraph + local Llama agent to make explainable, carbon-aware placement decisions.",
        links: [
            { label: "Paper", href: `${GH}/autonomous-carbon-k8s-scheduler/tree/main/paper` },
            { label: "Code", href: `${GH}/autonomous-carbon-k8s-scheduler` },
        ],
    },
];

// Hackathons and competitions.
export const hackathons = [
    {
        event: "Amazon ML Challenge 2026",
        track: "National machine-learning challenge by Amazon",
        format: "Challenge",
        year: "2026",
        summary:
            "Competed in Amazon's annual ML challenge and finished in the top 3% of the leaderboard.",
        stats: [
            { value: "Top 3%", label: "leaderboard" },
        ],
        links: [],
    },
    {
        event: "Razorpay AI Buildathon 2026",
        track: "Track 02 · AI Risk Manager",
        format: "Buildathon",
        year: "2026",
        project: "COD Return-Risk Scorer",
        summary:
            "Built and deployed a cost-sensitive risk scorer that flags cash-on-delivery orders likely to come back undelivered, with SHAP reasons and a plain-English action for the seller.",
        stats: [
            { value: "₹29.5K", label: "saved / 10K orders" },
            { value: "0.806", label: "ROC-AUC" },
            { value: "live", label: "FastAPI demo" },
        ],
        links: [
            { label: "Live demo", href: "https://cod-return-risk-scorer.onrender.com/" },
            { label: "Code", href: `${GH}/rto-return-risk-scorer` },
        ],
    },
    {
        event: "RSNA Knee Abnormality Detection",
        track: "Kaggle research code competition",
        format: "Competition",
        year: "2026",
        project: "Knee MRI Abnormality Detection",
        summary:
            "Detected 12 knee abnormalities from multi-series MRI using LLM-graded multilingual radiology reports as labels, under offline inference and a 9-hour runtime limit.",
        stats: [
            { value: "0.906", label: "private AUC" },
            { value: "6,425", label: "teams" },
            { value: "15", label: "model ensemble" },
        ],
        links: [
            { label: "Competition", href: "https://www.kaggle.com/competitions/rsna-knee-abnormality-detection" },
            { label: "Code", href: `${GH}/knee-mri-abnormality-detection` },
        ],
    },
];
