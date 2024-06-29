const messages = [
    "Tôi luôn sẵn sàng lắng nghe nếu bạn cần chia sẻ hoặc nói chuyện về bất cứ điều gì. Cảm ơn bạn vì đã luôn bên cạnh và tin tưởng tôi. 🌟",
    "Nếu bạn cần một bờ vai để chia sẻ hay đơn giản là nói chuyện, tôi sẵn lòng lắng nghe. Cảm ơn bạn đã luôn tin tưởng và ở bên cạnh. 🌈",
    "Tôi luôn có thời gian để lắng nghe nếu bạn cần chia sẻ hay nói chuyện. Cảm ơn bạn vì luôn tin tưởng và giữ liên lạc. 🌺",
    "Nếu có điều gì muốn chia sẻ hay nói, hãy nói ra. Tôi luôn sẵn lòng lắng nghe và sẵn sàng để giúp đỡ. 🌸",
    "Nếu bạn cảm thấy muốn nói chuyện hoặc cần một đôi tai lắng nghe, tôi ở đây. Cảm ơn bạn đã luôn tin tưởng và giữ liên lạc. 🎈",
    "Tôi rất vui lòng được lắng nghe và chia sẻ cùng bạn nếu có điều gì muốn nói. Cảm ơn bạn đã luôn đứng về phía tôi và tin tưởng. 🌻",
    "Nếu bạn cần người để chia sẻ hoặc nói chuyện, tôi sẵn lòng lắng nghe. Cảm ơn bạn đã luôn tin tưởng và ở bên cạnh. 🌿",
    "Tôi luôn sẵn sàng lắng nghe nếu bạn cần nói chuyện hay chia sẻ gì đó. Cảm ơn bạn đã luôn tin tưởng và giữ liên lạc. 🌞",
    "Nếu có điều gì muốn nói, hãy nói ra. Tôi luôn sẵn lòng lắng nghe và hỗ trợ bạn. Cảm ơn bạn đã luôn tin tưởng và ở bên cạnh. 🌼",
    "Nếu bạn cảm thấy cần nói chuyện hay chia sẻ điều gì đó, hãy yên tâm nói. Tôi sẵn lòng lắng nghe và hỗ trợ bạn. Cảm ơn bạn đã luôn đứng về phía tôi và giữ liên lạc. 🎉",
];

module.exports = () => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
};
