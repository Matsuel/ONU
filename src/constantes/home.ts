export const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.2 } },
    exit: { opacity: 0, transition: { duration: 1.2 } },
};

export const titleVariants = {
    hidden: { opacity: 0, y: "-100vh" },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2 } },
    exit: { opacity: 0, y: "-100vh", transition: { duration: 1.2 } },
};

export const imageVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 1.2 } },
    exit: { scale: 0, opacity: 0, transition: { duration: 1.2 } },
};

export const homeLinks = [
    {
        title: "Accueil",
        pageToSet: "home",
    },
    {
        title: "Créer une partie",
        pageToSet: "create",
    },
    {
        title: "Rejoindre une partie",
        pageToSet: "join",
    },
];