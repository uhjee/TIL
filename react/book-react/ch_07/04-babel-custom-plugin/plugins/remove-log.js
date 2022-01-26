module.exports = function ({ types : t }) {
  return {
    visitor: {
      ExpressionStatement(path) {
        // Expressionstatement 노드가 생성되면 호출되도록 메소드 등록
        if (t.isCallExpression(path.node.expression)) {
          // Expressionstatement 노드의 expression 속성이 CallExpression인지 검사
          if (t.isMemberExpression(path.node.expression.callee)) {
            // callee 속성이 MemberExpression 노드인지 검사
            const memberExp = path.node.expression.callee;
            if (
              memberExp.object.name === 'console' &&
              memberExp.property.name === 'log' // console 객체의 log 메소드가 호출된 것인지 검사
            ) {
              path.remove(); // AST에서 Expressionstatement 노드 제거
            }
          }
        }
      },
    },
  };
};
