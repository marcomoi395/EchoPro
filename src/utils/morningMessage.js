const morningMessages = [
    "🌞 Chúc bạn một ngày mới tràn đầy năng lượng và thành công!",
    "🌅 Buổi sáng an lành và hạnh phúc nhé!",
    "🌼 Xin chào! Chúc bạn có một ngày thật vui vẻ và đầy may mắn.",
    "🌟 Hãy bắt đầu ngày mới với tâm trạng tích cực và nhiều niềm vui nhé!",
    "🌈 Mọi việc sẽ tốt đẹp hơn trong ngày hôm nay. Chúc bạn buổi sáng tuyệt vời!",
    "🌻 Chào buổi sáng! Hy vọng bạn có một ngày đầy năng lượng và thành công.",
    "🌞 Buổi sáng nắng đẹp này, hãy cười và làm việc chăm chỉ nhé!",
    "🎯 Một ngày mới bắt đầu, hãy đặt ra mục tiêu và cố gắng hết mình bạn nhé!",
    "🌸 Chúc bạn một ngày mới thật nhiều niềm vui và thành công.",
    "☀️ Buổi sáng tốt lành! Hãy bắt đầu từ những điều tốt đẹp nhất.",
    "🌿 Hãy luôn nhớ rằng mỗi sớm mai đều là một cơ hội mới.",
    "🌞 Chào buổi sáng! Hy vọng bạn có một ngày đầy sức sống và thành công.",
    "🌼 Buổi sáng hôm nay, hãy đón nhận niềm vui và những thử thách mới nhé!",
    "🚀 Hãy bắt đầu ngày mới với tinh thần lạc quan và nhiệt huyết.",
    "🍀 Chúc bạn buổi sáng an lành và đầy may mắn.",
    "🌞 Mỗi sớm mai là một cơ hội để bạn làm những điều tuyệt vời nhất.",
    "🌅 Buổi sáng thật tươi mới! Hãy nở nụ cười và bắt đầu một ngày tuyệt vời nhé!",
    "🎉 Hãy để mỗi ngày là một bước tiến mới trên con đường thành công của bạn.",
    "🌟 Buổi sáng thật tuyệt vời để bạn thể hiện sự xuất sắc của mình.",
    "🌞 Chào buổi sáng! Hãy dành một chút thời gian để cảm nhận sự bình yên của ngày mới."
];

module.exports = () => {
    const randomIndex = Math.floor(Math.random() * morningMessages.length);
    return morningMessages[randomIndex];
};