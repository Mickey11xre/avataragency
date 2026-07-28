
---

SOURCE: platform.claude.com docs — choosing-a-model

# Choosing the right model

Selecting the optimal Claude model for your application involves balancing three key considerations: capabilities, speed, and cost. This guide helps you make an informed decision based on your specific requirements.

---

## Establish key criteria

When choosing a Claude model, consider first evaluating these factors:

* **Capabilities:** What specific features or capabilities will you need the model to have to meet your needs?
* **Speed:** How quickly does the model need to respond in your application? Claude Opus 5 and Claude Opus 4.8 support [fast mode](/docs/en/build-with-claude/fast-mode) (research preview), which delivers up to 2.5x higher output speed at premium pricing.
* **Cost:** What's your budget for both development and production usage?
* **Effort:** Recent Opus and Sonnet models support an [effort parameter](/docs/en/build-with-claude/effort) that trades intelligence for latency and cost within a single model. Tuning effort is often a better lever than switching models. On Claude Opus 5, start with the default (`high`) and adjust up or down based on your evals. On Claude Opus 4.8 and Claude Opus 4.7, the `xhigh` effort level, between `high` and `max`, is the best setting for most coding and agentic use cases.

Knowing these answers in advance will make narrowing down and deciding which model to use much easier.

***

## Choose the best model to start with

There are two general approaches you can use to start testing which Claude model best works for your needs.

### Option 1: Start efficiency-first

For many applications, starting with a faster, more cost-effective model like Claude Haiku 4.5 can be the optimal approach:

1. Begin implementation with Claude Haiku 4.5.
2. Test your use case thoroughly.
3. Evaluate if performance meets your requirements.
4. Upgrade only if necessary for specific capability gaps.

This approach allows for quick iteration, lower development costs, and is often sufficient for many common applications. This approach is best for:

* Initial prototyping and development
* Applications with tight latency requirements
* Cost-sensitive implementations
* High-volume, straightforward tasks

### Option 2: Start capability-first

For complex tasks where intelligence and advanced capabilities are paramount, you may want to start capability-first: implement with the strongest starting point for your task, then optimize to more efficient models down the line:

1. Implement with Claude Opus 5.
2. [Optimize your prompts](/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5) for this model.
3. Evaluate if performance meets your requirements.
4. Consider increasing efficiency by lowering [effort](/docs/en/build-with-claude/effort) or downgrading models over time with greater workflow optimization.

This approach is best for:

* Complex reasoning tasks
* Scientific or mathematical applications
* Tasks requiring nuanced understanding
* Applications where accuracy outweighs cost considerations
* Advanced coding and high-autonomy agentic work

<Note>
  The [effort parameter](/docs/en/build-with-claude/effort) defaults to `high` on Claude Opus 5 and Claude Opus 4.8, including in Claude Code and the Messages API. On Claude Opus 5, start at the default and step up to `xhigh` for the most demanding coding and agentic work. On Claude Opus 4.8, use `xhigh` for coding, high-autonomy work, and the most intelligence-demanding tasks.
</Note>

**Claude Opus 5** (`claude-opus-5`) is a step-change improvement over Claude Opus 4.8, strong on deep reasoning, agentic and long-horizon tasks, and test-time compute scaling. Claude Opus 5 supports a 1M token context window by default and up to 128k output tokens, and is priced at $5 per million input tokens and $25 per million output tokens.

**Claude Fable 5** (`claude-fable-5`) is Anthropic's most capable widely released model, delivering next-generation intelligence for long-running agents. **Claude Mythos 5** (`claude-mythos-5`) is available through [Project Glasswing](https://anthropic.com/glasswing). Both models support a 1M token context window by default, up to 128k output tokens, and always-on [adaptive thinking](/docs/en/build-with-claude/thinking). See [Introducing Claude Fable 5 and Claude Mythos 5](/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5) for launch details.

Claude Fable 5 and Claude Mythos 5 are priced at $10 per million input tokens and $50 per million output tokens.

## Model selection matrix

| When you need...                                                                                             | Consider starting with... | Example use cases                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------ | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The highest available capability                                                                             | Claude Fable 5            | Long-running agents, deep reasoning, long-horizon agentic tasks, advanced research                                                                                |
| Complex agentic coding and enterprise work                                                                   | Claude Opus 5             | Multihour autonomous coding agents, large-scale refactoring, complex systems engineering, advanced research, knowledge work, vision-heavy workflows, computer use |
| Frontier intelligence at scale, built for coding, agents, and enterprise workflows                           | Claude Sonnet 5           | Code generation, data analysis, content creation, visual understanding, agentic tool use                                                                          |
| Near-frontier performance with lightning-fast speed and extended thinking at the most economical price point | Claude Haiku 4.5          | Real-time applications, high-volume intelligent processing, cost-sensitive deployments needing strong reasoning, sub-agent tasks                                  |

***

## Decide whether to upgrade or change models

To determine if you need to upgrade or change models, you should:

1. [Create benchmark tests](/docs/en/test-and-evaluate/develop-tests) specific to your use case - having a good evaluation set is the most important step in the process.

2. Test with your actual prompts and data.

3. Compare performance across models for:

   * Accuracy of responses
   * Response quality
   * Handling of edge cases

4. Weigh performance and cost tradeoffs.

## Next steps

<CardGroup cols={2}>
  <Card title="Model comparison chart" icon="settings" href="/docs/en/about-claude/models/overview">
    See detailed specifications and pricing for the latest Claude models
  </Card>

  <Card title="What's new in Claude Opus 5" icon="sparkle" href="/docs/en/about-claude/models/whats-new-opus-5">
    Explore the latest improvements in Claude Opus 5
  </Card>

  <Card title="What's new in Claude Sonnet 5" icon="sparkle" href="/docs/en/about-claude/models/whats-new-sonnet-5">
    The best combination of speed and intelligence
  </Card>

  <Card title="Start building" icon="code" href="/docs/en/get-started">
    Get started with your first API call
  </Card>
</CardGroup>

---

SOURCE: platform.claude.com docs — claude-prompting-best-practices

# Prompting best practices

Comprehensive guide to prompt engineering techniques for Claude's latest models, covering clarity, examples, XML structuring, thinking, and agentic systems.

---

This is the reference for prompt engineering with Claude's latest models, including Claude Fable 5, Claude Mythos 5, Claude Opus 5, Claude Opus 4.8, Claude Opus 4.7, Claude Opus 4.6, Claude Sonnet 5, Claude Sonnet 4.6, and Claude Haiku 4.5. The page is organized in three parts:

* **Model-specific guidance** first: where [Claude Fable 5](/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5), [Claude Sonnet 5](/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5), [Claude Opus 5](/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5), and [Claude Opus 4.8](/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-4-8) behave differently and what to change.
* **Techniques for all current models** after that: general principles, output and formatting, tool use, thinking, and agentic systems.
* **Migration considerations** last, for prompts moving from earlier generations.

<Tip>
  For an overview of model capabilities, see the [models overview](/docs/en/about-claude/models/overview). For Claude Fable 5 capabilities and API changes, see [Introducing Claude Fable 5 and Claude Mythos 5](/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5). For details on what's new in Claude Sonnet 5, see [What's new in Claude Sonnet 5](/docs/en/about-claude/models/whats-new-sonnet-5). For details on what's new in Claude Opus 5, see [What's new in Claude Opus 5](/docs/en/about-claude/models/whats-new-opus-5). For migration guidance, see the [Migration guide](/docs/en/about-claude/models/migration-guide).
</Tip>

## Claude Fable 5

Prompting guidance for Claude Fable 5 and Claude Mythos 5 has its own page: [Prompting Claude Fable 5](/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5). It covers the behavioral differences from Claude Opus 4.8 and the prompt and scaffolding changes worth making, including effort levels, instruction following, long-run progress claims, memory systems, and the `reasoning_extraction` refusal category.

## Claude Sonnet 5

Prompting guidance for Claude Sonnet 5 has its own page: [Prompting Claude Sonnet 5](/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5). It covers the behavioral differences from Claude Sonnet 4.6 and the prompt changes worth making, including response length, effort and thinking-depth calibration, tool use triggering, literal instruction following, and design and frontend defaults.

## Prompting Claude Opus 5

Prompting guidance for Claude Opus 5 has its own page: [Prompting Claude Opus 5](/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5). It covers the behavioral differences from prior Opus models and the prompt changes worth making, including response length and verbosity, user-facing progress updates, written deliverable length, task scope and over-verification, subagent control, and self-correction.

## Prompting Claude Opus 4.8

Prompting guidance for Claude Opus 4.8 has its own page: [Prompting Claude Opus 4.8](/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-4-8). It covers response length, effort and thinking-depth calibration, tool use triggering, literal instruction following, subagent control, and design and frontend defaults.

## General principles

The techniques in this section and the sections that follow apply to all current Claude models, including Claude Fable 5 and Claude Mythos 5.

### Be clear and direct

Claude responds well to clear, explicit instructions. Being specific about your desired output can help enhance results. If you want "above and beyond" behavior, explicitly request it rather than relying on the model to infer this from vague prompts.

Think of Claude as a brilliant but new employee who lacks context on your norms and workflows. The more precisely you explain what you want, the better the result.

**Golden rule:** Show your prompt to a colleague with minimal context on the task and ask them to follow it. If they'd be confused, Claude will be too.

* Be specific about the desired output format and constraints.
* Provide instructions as sequential steps using numbered lists or bullet points when the order or completeness of steps matters.

<Accordion title="Example: Creating an analytics dashboard">
  **Less effective:**

  ```text wrap
  Create an analytics dashboard
  ```

  **More effective:**

  ```text wrap
  Create an analytics dashboard. Include as many relevant features and interactions as possible. Go beyond the basics to create a fully-featured implementation.
  ```
</Accordion>

### Add context to improve performance

Providing context or motivation behind your instructions, such as explaining to Claude why such behavior is important, can help Claude better understand your goals and deliver more targeted responses.

<Accordion title="Example: Formatting preferences">
  **Less effective:**

  ```text wrap
  NEVER use ellipses
  ```

  **More effective:**

  ```text wrap
  Your response will be read aloud by a text-to-speech engine, so never use ellipses since the text-to-speech engine will not know how to pronounce them.
  ```
</Accordion>

Claude is smart enough to generalize from the explanation.

### Use examples effectively

Examples are one of the most reliable ways to steer Claude's output format, tone, and structure. A few well-crafted examples (known as few-shot or multishot prompting) improve accuracy and consistency.

When adding examples, make them:

* **Relevant:** Mirror your actual use case closely.
* **Diverse:** Cover edge cases and vary enough that Claude doesn't pick up unintended patterns.
* **Structured:** Wrap examples in `<example>` tags (multiple examples in `<examples>` tags) so Claude can distinguish them from instructions.

<Tip>
  Include 3–5 examples for best results. You can also ask Claude to evaluate your examples for relevance and diversity, or to generate additional ones based on your initial set.
</Tip>

### Structure prompts with XML tags

XML tags help Claude parse complex prompts unambiguously, especially when your prompt mixes instructions, context, examples, and variable inputs. Wrapping each type of content in its own tag (for example, `<instructions>`, `<context>`, `<input>`) reduces misinterpretation.

Best practices:

* Use consistent, descriptive tag names across your prompts.
* Nest tags when content has a natural hierarchy (documents inside `<documents>`, each inside `<document index="n">`).

### Give Claude a role

Setting a role in the system prompt focuses Claude's behavior and tone for your use case. Even a single sentence makes a difference:

<CodeGroup>
  ```bash cURL
  curl https://api.anthropic.com/v1/messages \
    -H "content-type: application/json" \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -d '{
      "model": "claude-opus-5",
      "max_tokens": 1024,
      "system": "You are a helpful coding assistant specializing in Python.",
      "messages": [
        {"role": "user", "content": "How do I sort a list of dictionaries by key?"}
      ]
    }'
  ```

  ```bash CLI
  ant messages create \
    --model claude-opus-5 \
    --max-tokens 1024 \
    --system "You are a helpful coding assistant specializing in Python." \
    --message '{role: user, content: "How do I sort a list of dictionaries by key?"}'
  ```

  ```python Python
  client = anthropic.Anthropic()

  message = client.messages.create(
      model="claude-opus-5",
      max_tokens=1024,
      system="You are a helpful coding assistant specializing in Python.",
      messages=[
          {"role": "user", "content": "How do I sort a list of dictionaries by key?"}
      ],
  )

  print(message.content)
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  const message = await client.messages.create({
    model: "claude-opus-5",
    max_tokens: 1024,
    system: "You are a helpful coding assistant specializing in Python.",
    messages: [{ role: "user", content: "How do I sort a list of dictionaries by key?" }]
  });

  console.log(message.content);
  ```

  ```csharp C#
  AnthropicClient client = new();

  var parameters = new MessageCreateParams
  {
      Model = Model.ClaudeOpus5,
      MaxTokens = 1024,
      System = "You are a helpful coding assistant specializing in Python.",
      Messages =
      [
          new() { Role = Role.User, Content = "How do I sort a list of dictionaries by key?" }
      ]
  };

  var message = await client.Messages.Create(parameters);
  Console.WriteLine(message);
  ```

  ```go Go
  client := anthropic.NewClient()

  message, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
  	Model:     anthropic.ModelClaudeOpus5,
  	MaxTokens: 1024,
  	System: []anthropic.TextBlockParam{
  		{Text: "You are a helpful coding assistant specializing in Python."},
  	},
  	Messages: []anthropic.MessageParam{
  		anthropic.NewUserMessage(anthropic.NewTextBlock("How do I sort a list of dictionaries by key?")),
  	},
  })
  if err != nil {
  	log.Fatal(err)
  }
  fmt.Println(message.Content)
  ```

  ```java Java
  AnthropicClient client = AnthropicOkHttpClient.fromEnv();

  MessageCreateParams params = MessageCreateParams.builder()
      .model(Model.CLAUDE_OPUS_5)
      .maxTokens(1024)
      .system("You are a helpful coding assistant specializing in Python.")
      .addUserMessage("How do I sort a list of dictionaries by key?")
      .build();

  Message message = client.messages().create(params);
  System.out.println(message.content());
  ```

  ```php PHP
  $client = new Client();

  $message = $client->messages->create(
      maxTokens: 1024,
      messages: [
          ['role' => 'user', 'content' => 'How do I sort a list of dictionaries by key?']
      ],
      model: 'claude-opus-5',
      system: 'You are a helpful coding assistant specializing in Python.',
  );

  echo json_encode($message->content, JSON_PRETTY_PRINT), PHP_EOL;
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  message = client.messages.create(
    model: "claude-opus-5",
    max_tokens: 1024,
    system: "You are a helpful coding assistant specializing in Python.",
    messages: [
      { role: "user", content: "How do I sort a list of dictionaries by key?" }
    ]
  )

  puts message.content
  ```
</CodeGroup>

### Long context prompting

When working with large documents or data-rich inputs (20k+ tokens), structure your prompt carefully to get the best results:

* **Put longform data at the top:** Place your long documents and inputs near the top of your prompt, above your query, instructions, and examples. This improves performance across all models.

  <Note>
    Queries at the end can improve response quality by up to 30 percent in tests, especially with complex, multidocument inputs.
  </Note>

* **Structure document content and metadata with XML tags:** When using multiple documents, wrap each document in `<document>` tags with `<document_content>` and `<source>` (and other metadata) subtags for clarity.

  <Accordion title="Example multidocument structure">
    ```xml
    <documents>
      <document index="1">
        <source>annual_report_2023.pdf</source>
        <document_content>
          {{ANNUAL_REPORT}}
        </document_content>
      </document>
      <document index="2">
        <source>competitor_analysis_q2.xlsx</source>
        <document_content>
          {{COMPETITOR_ANALYSIS}}
        </document_content>
      </document>
    </documents>

    Analyze the annual report and competitor analysis. Identify strategic advantages and recommend Q3 focus areas.
    ```
  </Accordion>

* **Ground responses in quotes:** For long document tasks, ask Claude to quote relevant parts of the documents first before carrying out its task. This helps Claude focus on the relevant content and ignore the rest of the document.

  <Accordion title="Example quote extraction">
    ```xml
    You are an AI physician's assistant. Your task is to help doctors diagnose possible patient illnesses.

    <documents>
      <document index="1">
        <source>patient_symptoms.txt</source>
        <document_content>
          {{PATIENT_SYMPTOMS}}
        </document_content>
      </document>
      <document index="2">
        <source>patient_records.txt</source>
        <document_content>
          {{PATIENT_RECORDS}}
        </document_content>
      </document>
      <document index="3">
        <source>patient01_appt_history.txt</source>
        <document_content>
          {{PATIENT01_APPOINTMENT_HISTORY}}
        </document_content>
      </document>
    </documents>

    Find quotes from the patient records and appointment history that are relevant to diagnosing the patient's reported symptoms. Place these in <quotes> tags. Then, based on these quotes, list all information that would help the doctor diagnose the patient's symptoms. Place your diagnostic information in <info> tags.
    ```
  </Accordion>

### Model self-knowledge

If you would like Claude to identify itself correctly in your application or use specific API strings:

```text Sample prompt for model identity wrap
The assistant is Claude, created by Anthropic. The current model is Claude Opus 5.
```

For LLM-powered apps that need to specify model strings:

```text Sample prompt for model string wrap
When an LLM is needed, please default to Claude Opus 5 unless the user requests
otherwise. The exact model string for Claude Opus 5 is claude-opus-5.
```

## Output and formatting

### Communication style and verbosity

Claude's latest models have a more concise and natural communication style compared to previous models:

* **More direct and grounded:** Provides fact-based progress reports rather than self-celebratory updates
* **More conversational:** Slightly more fluent and colloquial, less machine-like
* **Less verbose:** May skip detailed summaries for efficiency unless prompted otherwise

This means Claude may skip verbal summaries after tool calls, jumping directly to the next action. If you prefer more visibility into its reasoning:

```text Sample prompt wrap
After completing a task that involves tool use, provide a quick summary of the work you've done.
```

Claude Opus 5 is an exception on verbosity: its default user-facing responses run longer than prior models', and raising or lowering [effort](/docs/en/build-with-claude/effort) does not reliably change visible response length. Prompt explicitly for conciseness instead. See [Prompting Claude Opus 5](/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5#response-length-and-verbosity) for a sample instruction.

### Control the format of responses

There are a few particularly effective ways to steer output formatting:

1. **Tell Claude what to do instead of what not to do**

   * Instead of: "Do not use markdown in your response"
   * Try: "Your response should be composed of smoothly flowing prose paragraphs."

2. **Use XML format indicators**

   * Try: "Write the prose sections of your response in \<smoothly\_flowing\_prose\_paragraphs> tags."

3. **Match your prompt style to the desired output**

   The formatting style used in your prompt may influence Claude's response style. If you are still experiencing steerability issues with output formatting, try matching your prompt style to your desired output style as closely as possible. For example, removing markdown from your prompt can reduce the volume of markdown in the output.

4. **Use detailed prompts for specific formatting preferences**

   For more control over markdown and formatting usage, provide explicit guidance:

````text Sample prompt to minimize markdown wrap
<avoid_excessive_markdown_and_bullet_points>
When writing reports, documents, technical explanations, analyses, or any long-form
content, write in clear, flowing prose using complete paragraphs and sentences. Use
standard paragraph breaks for organization and reserve markdown primarily for `inline
code`, code blocks (```...```), and simple headings (## and ###). Avoid using **bold**
and *italics*.

DO NOT use ordered lists (1. ...) or unordered lists (*) unless: a) you're presenting
truly discrete items where a list format is the best option, or b) the user explicitly
requests a list or ranking

Instead of listing items with bullets or numbers, incorporate them naturally into
sentences. This guidance applies especially to technical writing. Using prose instead of
excessive formatting will improve user satisfaction. NEVER output a series of overly
short bullet points.

Your goal is readable, flowing text that guides the reader naturally through ideas
rather than fragmenting information into isolated points.
</avoid_excessive_markdown_and_bullet_points>
````

### LaTeX output

Claude's latest models default to LaTeX for mathematical expressions, equations, and technical explanations. If you prefer plain text, add the following instructions to your prompt:

```text Sample prompt wrap
Format your response in plain text only. Do not use LaTeX, MathJax, or any markup
notation such as \( \), $, or \frac{}{}. Write all math expressions using standard text
characters (e.g., "/" for division, "*" for multiplication, and "^" for exponents).
```

### Document creation

Claude's latest models create presentations, animations, and visual documents with strong instruction following, and usually produce usable output on the first try.

For best results with document creation:

```text Sample prompt wrap
Create a professional presentation on [topic]. Include thoughtful design elements,
visual hierarchy, and engaging animations where appropriate.
```

### Migrating away from prefilled responses

Starting with Claude 4.6 models and [Claude Mythos Preview](https://anthropic.com/glasswing), prefilled responses (providing a partial assistant message for Claude to continue from) on the last assistant turn are no longer supported. Requests with prefilled assistant messages to these models return a 400 error. Model intelligence and instruction following have advanced such that most use cases of prefill no longer require it. Earlier models continue to support prefills, and adding assistant messages elsewhere in the conversation is not affected.

Here are common prefill scenarios and how to migrate away from them:

<Accordion title="Controlling output formatting">
  Prefills have been used to force specific output formats like JSON/YAML, classification, and similar patterns where the prefill constrains Claude to a particular structure.

  **Migration:** The [Structured Outputs](/docs/en/build-with-claude/structured-outputs) feature is designed specifically to constrain Claude's responses to follow a given schema. Try asking the model to conform to your output structure first, as newer models can reliably match complex schemas when told to, especially if implemented with retries. For classification tasks, use either tools with an enum field containing your valid labels or structured outputs.
</Accordion>

<Accordion title="Eliminating preambles">
  Prefills like `Here is the requested summary:\n` were used to skip introductory text.

  **Migration:** Use direct instructions in the system prompt: "Respond directly without preamble. Do not start with phrases like 'Here is...', 'Based on...', etc." Alternatively, direct the model to output within XML tags, use structured outputs, or use tool calling. If the occasional preamble slips through, strip it in post-processing.
</Accordion>

<Accordion title="Avoiding bad refusals">
  Prefills were used to steer around unnecessary refusals.

  **Migration:** Claude is much better at appropriate refusals now. Clear prompting within the `user` message without prefill should be sufficient.
</Accordion>

<Accordion title="Continuations">
  Prefills were used to continue partial completions, resume interrupted responses, or pick up where a previous generation left off.

  **Migration:** Move the continuation to the user message, and include the final text from the interrupted response: "Your previous response was interrupted and ended with \`\[previous\_response]\`. Continue from where you left off." If this is part of error-handling or incomplete-response-handling and there is no UX penalty, retry the request.
</Accordion>

<Accordion title="Context hydration and role consistency">
  Prefills were used to periodically ensure refreshed or injected context.

  **Migration:** For very long conversations, inject what were previously prefilled-assistant reminders into the user turn. If context hydration is part of a more complex agentic system, consider hydrating through tools (expose or encourage use of tools containing context based on heuristics such as number of turns) or during [context compaction](/docs/en/build-with-claude/compaction).
</Accordion>

## Tool use

### Tool usage

Claude's latest models are trained for precise instruction following and benefit from explicit direction to use specific tools. If you say "can you suggest some changes," Claude will sometimes provide suggestions rather than implementing them, even if making changes might be what you intended. For how to define tools and troubleshoot tool triggering, see [Tool use with Claude](/docs/en/agents-and-tools/tool-use/overview).

For Claude to take action, be more explicit:

<Accordion title="Example: Explicit instructions">
  **Less effective (Claude will only suggest):**

  ```text wrap
  Can you suggest some changes to improve this function?
  ```

  **More effective (Claude will make the changes):**

  ```text wrap
  Change this function to improve its performance.
  ```

  Or:

  ```text wrap
  Make these edits to the authentication flow.
  ```
</Accordion>

To make Claude more proactive about taking action by default, you can add this to your system prompt:

```text Sample prompt for proactive action wrap
<default_to_action>
By default, implement changes rather than only suggesting them. If the user's intent is
unclear, infer the most useful likely action and proceed, using tools to discover any
missing details instead of guessing. Try to infer the user's intent about whether a tool
call (e.g., file edit or read) is intended or not, and act accordingly.
</default_to_action>
```

On the other hand, if you want the model to be more hesitant by default, less prone to jumping straight into implementations, and only take action if requested, you can steer this behavior with a prompt like the following:

```text Sample prompt for conservative action wrap
<do_not_act_before_instructions>
Do not jump into implementation or change files unless clearly instructed to make
changes. When the user's intent is ambiguous, default to providing information, doing
research, and providing recommendations rather than taking action. Only proceed with
edits, modifications, or implementations when the user explicitly requests them.
</do_not_act_before_instructions>
```

Claude Opus 4.5 and Claude Opus 4.6 are also more responsive to the system prompt than previous models. If your prompts were designed to reduce undertriggering on tools or skills, these models may now overtrigger. The fix is to dial back any aggressive language. Where you might have said "CRITICAL: You MUST use this tool when...", you can use more normal prompting like "Use this tool when...".

### Optimize parallel tool calling

Claude's latest models run independent tool calls in parallel. These models will:

* Run multiple speculative searches during research
* Read several files at once to build context faster
* Run bash commands in parallel (which can even bottleneck system performance)

This behavior is steerable. While the model has a high success rate in parallel tool calling without prompting, you can boost this to \~100% or adjust the aggression level:

```text Sample prompt for maximum parallel efficiency wrap
<use_parallel_tool_calls>
If you intend to call multiple tools and there are no dependencies between the tool
calls, make all of the independent tool calls in parallel. Prioritize calling tools
simultaneously whenever the actions can be done in parallel rather than sequentially.
For example, when reading 3 files, run 3 tool calls in parallel to read all 3 files into
context at the same time. Maximize use of parallel tool calls where possible to increase
speed and efficiency. However, if some tool calls depend on previous calls to inform
dependent values like the parameters, do NOT call these tools in parallel and instead
call them sequentially. Never use placeholders or guess missing parameters in tool
calls.
</use_parallel_tool_calls>
```

```text Sample prompt to reduce parallel execution wrap
Execute operations sequentially with brief pauses between each step to ensure stability.
```

## Thinking and reasoning

### Overthinking and excessive thoroughness

Claude Opus 4.6 does more upfront exploration than previous models, especially at higher [`effort`](/docs/en/build-with-claude/effort) settings. This initial work often helps to optimize the final results, but the model may gather extensive context or pursue multiple threads of research without being prompted. If your prompts previously encouraged the model to be more thorough, you should tune that guidance for Claude Opus 4.6:

* **Replace blanket defaults with more targeted instructions.** Instead of "Default to using \[tool]," add guidance like "Use \[tool] when it would enhance your understanding of the problem."
* **Remove over-prompting.** Tools that undertriggered in previous models are likely to trigger appropriately now. Instructions like "If in doubt, use \[tool]" will cause overtriggering.
* **Use effort as a fallback.** If Claude continues to be overly aggressive, use a lower setting for `effort`.

In some cases, Claude Opus 4.6 may think extensively, which can inflate thinking tokens and slow down responses. If this behavior is undesirable, you can add explicit instructions to constrain its reasoning, or you can lower the `effort` setting to reduce overall thinking and token usage.

```text Sample prompt wrap
When you're deciding how to approach a problem, choose an approach and commit to it.
Avoid revisiting decisions unless you encounter new information that directly
contradicts your reasoning. If you're weighing two approaches, pick one and see it
through. You can always course-correct later if the chosen approach fails.
```

If you need a hard ceiling on thinking costs, extended thinking with a `budget_tokens` cap is still functional on Opus 4.6 and Sonnet 4.6 but is deprecated. On Claude 4.7 and later models, setting `budget_tokens` returns a 400 error. Prefer lowering the [effort](/docs/en/build-with-claude/effort) setting or using `max_tokens` as a hard limit with [adaptive thinking](/docs/en/build-with-claude/thinking).

### Leverage thinking & interleaved thinking capabilities

Claude's latest models offer thinking capabilities that can be especially helpful for tasks involving reflection after tool use or complex multistep reasoning. You can guide its initial or interleaved thinking for better results.

Claude 4.6 and later models and Claude Mythos Preview use [adaptive thinking](/docs/en/build-with-claude/thinking) (`thinking: {type: "adaptive"}`), where Claude dynamically decides when and how much to think. On Claude Fable 5 and Claude Mythos 5, thinking is always on and adaptive thinking is the only mode. Claude calibrates its thinking based on two factors: the `effort` parameter and query complexity. Higher effort elicits more thinking, and more complex queries do the same. On easier queries that don't require thinking, the model responds directly. In internal evaluations, adaptive thinking reliably drives better performance than extended thinking. Consider moving to adaptive thinking to get the most intelligent responses.

Use adaptive thinking for workloads that require agentic behavior such as multistep tool use, complex coding tasks, and long-horizon agent loops. Older models use manual [extended thinking](/docs/en/build-with-claude/extended-thinking) with `budget_tokens`; see the [per-model configuration table](/docs/en/build-with-claude/thinking-troubleshooting#supported-models) for which configuration each model accepts.

You can guide Claude's thinking behavior:

```text Example prompt wrap
After receiving tool results, carefully reflect on their quality and determine optimal
next steps before proceeding. Use your thinking to plan and iterate based on this new
information, and then take the best next action.
```

The triggering behavior for adaptive thinking is promptable. If you find the model thinking more often than you'd like, which can happen with large or complex system prompts, add guidance to steer it:

```text Sample prompt wrap
Thinking adds latency and should only be used when it will meaningfully improve
answer quality - typically for problems that require multistep reasoning. When in
doubt, respond directly.
```

If you are migrating from [extended thinking](/docs/en/build-with-claude/extended-thinking) with `budget_tokens`, replace your thinking configuration and move budget control to `effort`. The following examples show the same request before and after the migration (see [effort](/docs/en/build-with-claude/effort) for the available levels and per-model availability):

<CodeGroup>
  ```bash cURL
  # Before: extended thinking with a manual budget (older models)
  curl https://api.anthropic.com/v1/messages \
    -H "content-type: application/json" \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -d '{
      "model": "claude-sonnet-4-5-20250929",
      "max_tokens": 16000,
      "thinking": {"type": "enabled", "budget_tokens": 10000},
      "messages": [
        {"role": "user", "content": "..."}
      ]
    }'

  # After: adaptive thinking with effort
  curl https://api.anthropic.com/v1/messages \
    -H "content-type: application/json" \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -d '{
      "model": "claude-opus-4-8",
      "max_tokens": 16000,
      "thinking": {"type": "adaptive"},
      "output_config": {"effort": "high"},
      "messages": [
        {"role": "user", "content": "..."}
      ]
    }'
  ```

  ```bash CLI
  # Before: extended thinking with a manual budget (older models)
  ant messages create <<'YAML'
  model: claude-sonnet-4-5-20250929
  max_tokens: 16000
  thinking:
    type: enabled
    budget_tokens: 10000
  messages:
    - role: user
      content: "..."
  YAML

  # After: adaptive thinking with effort
  ant messages create <<'YAML'
  model: claude-opus-4-8
  max_tokens: 16000
  thinking:
    type: adaptive
  output_config:
    effort: high
  messages:
    - role: user
      content: "..."
  YAML
  ```

  ```python Python
  # Before: extended thinking with a manual budget (older models)
  client.messages.create(
      model="claude-sonnet-4-5-20250929",
      max_tokens=16000,
      thinking={"type": "enabled", "budget_tokens": 10000},
      messages=[{"role": "user", "content": "..."}],
  )

  # After: adaptive thinking with effort
  client.messages.create(
      model="claude-opus-4-8",
      max_tokens=16000,
      thinking={"type": "adaptive"},
      output_config={"effort": "high"},
      messages=[{"role": "user", "content": "..."}],
  )
  ```

  ```typescript TypeScript
  // Before: extended thinking with a manual budget (older models)
  await client.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 16000,
    thinking: { type: "enabled", budget_tokens: 10000 },
    messages: [{ role: "user", content: "..." }]
  });

  // After: adaptive thinking with effort
  await client.messages.create({
    model: "claude-opus-4-8",
    max_tokens: 16000,
    thinking: { type: "adaptive" },
    output_config: { effort: "high" },
    messages: [{ role: "user", content: "..." }]
  });
  ```

  ```csharp C#
  // Before: extended thinking with a manual budget (older models)
  await client.Messages.Create(new MessageCreateParams
  {
      Model = "claude-sonnet-4-5-20250929",
      MaxTokens = 16000,
      Thinking = new ThinkingConfigEnabled(budgetTokens: 10000),
      Messages = [new() { Role = Role.User, Content = "..." }]
  });

  // After: adaptive thinking with effort
  await client.Messages.Create(new MessageCreateParams
  {
      Model = Model.ClaudeOpus4_8,
      MaxTokens = 16000,
      Thinking = new ThinkingConfigAdaptive(),
      OutputConfig = new OutputConfig { Effort = Effort.High },
      Messages = [new() { Role = Role.User, Content = "..." }]
  });
  ```

  ```go Go
  // Before: extended thinking with a manual budget (older models)
  client.Messages.New(ctx, anthropic.MessageNewParams{
  	Model:     "claude-sonnet-4-5-20250929",
  	MaxTokens: 16000,
  	Thinking: anthropic.ThinkingConfigParamUnion{
  		OfEnabled: &anthropic.ThinkingConfigEnabledParam{BudgetTokens: 10000},
  	},
  	Messages: []anthropic.MessageParam{
  		anthropic.NewUserMessage(anthropic.NewTextBlock("...")),
  	},
  })

  // After: adaptive thinking with effort
  client.Messages.New(ctx, anthropic.MessageNewParams{
  	Model:     anthropic.ModelClaudeOpus4_8,
  	MaxTokens: 16000,
  	Thinking: anthropic.ThinkingConfigParamUnion{
  		OfAdaptive: &anthropic.ThinkingConfigAdaptiveParam{},
  	},
  	OutputConfig: anthropic.OutputConfigParam{
  		Effort: anthropic.OutputConfigEffortHigh,
  	},
  	Messages: []anthropic.MessageParam{
  		anthropic.NewUserMessage(anthropic.NewTextBlock("...")),
  	},
  })
  ```

  ```java Java
  // Before: extended thinking with a manual budget (older models)
  client.messages().create(MessageCreateParams.builder()
      .model("claude-sonnet-4-5-20250929")
      .maxTokens(16000L)
      .thinking(ThinkingConfigEnabled.builder().budgetTokens(10000L).build())
      .addUserMessage("...")
      .build());

  // After: adaptive thinking with effort
  client.messages().create(MessageCreateParams.builder()
      .model(Model.CLAUDE_OPUS_4_8)
      .maxTokens(16000L)
      .thinking(ThinkingConfigAdaptive.builder().build())
      .outputConfig(OutputConfig.builder()
          .effort(OutputConfig.Effort.HIGH)
          .build())
      .addUserMessage("...")
      .build());
  ```

  ```php PHP
  // Before: extended thinking with a manual budget (older models)
  $client->messages->create(
      model: 'claude-sonnet-4-5-20250929',
      maxTokens: 16000,
      thinking: ['type' => 'enabled', 'budget_tokens' => 10000],
      messages: [['role' => 'user', 'content' => '...']],
  );

  // After: adaptive thinking with effort
  $client->messages->create(
      model: 'claude-opus-4-8',
      maxTokens: 16000,
      thinking: ['type' => 'adaptive'],
      outputConfig: ['effort' => 'high'],
      messages: [['role' => 'user', 'content' => '...']],
  );
  ```

  ```ruby Ruby
  # Before: extended thinking with a manual budget (older models)
  client.messages.create(
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 16000,
    thinking: { type: "enabled", budget_tokens: 10000 },
    messages: [{ role: "user", content: "..." }]
  )

  # After: adaptive thinking with effort
  client.messages.create(
    model: "claude-opus-4-8",
    max_tokens: 16000,
    thinking: { type: "adaptive" },
    output_config: { effort: "high" },
    messages: [{ role: "user", content: "..." }]
  )
  ```
</CodeGroup>

If you are not using extended thinking, no changes are required. On Claude Opus 4.6 through Claude Opus 4.8 and Claude Sonnet 4.6, thinking is off when you omit the `thinking` parameter. On Claude Opus 5 and Claude Sonnet 5, thinking is on by default when you omit the `thinking` parameter; on Claude Opus 5, you can disable it only at effort `high` or lower. On Claude Fable 5 and Claude Mythos 5, thinking is always on, regardless of whether you set the `thinking` parameter.

* **Prefer general instructions over prescriptive steps.** A prompt like "think thoroughly" often produces better reasoning than a hand-written step-by-step plan. Claude's reasoning frequently exceeds what a human would prescribe.
* **Multishot examples work with thinking.** Use `<thinking>` tags inside your few-shot examples to show Claude the reasoning pattern. It will generalize that style to its own extended thinking blocks.
* **Manual chain-of-thought (CoT) prompting as a fallback.** When thinking is off, you can still encourage step-by-step reasoning by asking Claude to think through the problem. Use structured tags like `<thinking>` and `<answer>` to cleanly separate reasoning from the final output. On Claude Opus 5, prefer keeping thinking enabled at a lower effort level instead: with thinking disabled, the model can occasionally emit internal XML tags into its visible output, so see [Running with thinking disabled](/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5#running-with-thinking-disabled) before applying this pattern there.
* **Ask Claude to self-check.** Append something like "Before you finish, verify your answer against \[test criteria]." This catches errors reliably, especially for coding and math. Claude Opus 5 is the exception: it verifies its own work well without explicit instruction, and verification instructions carried over from prompts tuned for earlier models can cause over-verification, adding tokens and latency. When migrating to Claude Opus 5, remove these instructions rather than rewriting them; see [Task scope and over-verification](/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5#task-scope-and-over-verification).

<Note>
  When extended thinking is disabled, Claude Opus 4.5 is particularly sensitive to the word "think" and its variants. Consider using alternatives like "consider," "evaluate," or "reason through" in those cases.
</Note>

<Info>
  For more information on thinking capabilities, see [Thinking](/docs/en/build-with-claude/thinking) and [Steering thinking](/docs/en/build-with-claude/thinking-steering-and-cost).
</Info>

## Agentic systems

### Long-horizon reasoning and state tracking

Claude's latest models handle long-horizon reasoning tasks with strong state tracking. Claude maintains orientation across extended sessions by focusing on incremental progress, making steady advances on a few things at a time rather than attempting everything at once. This capability especially emerges over multiple context windows or task iterations, where Claude can work on a complex task, save the state, and continue with a fresh context window.

#### Context awareness and multiwindow workflows

Claude Sonnet 5, Claude Sonnet 4.6, Claude Sonnet 4.5, and Claude Haiku 4.5 feature [context awareness](/docs/en/build-with-claude/context-windows#context-awareness), enabling the model to track its remaining context window (that is, its "token budget") throughout a conversation. This enables Claude to execute tasks and manage context more effectively by understanding how much space it has to work.

**Managing context limits:**

If you are using Claude in an agent harness that compacts context or allows saving context to external files (like in Claude Code), consider adding this information to your prompt so Claude can behave accordingly. Otherwise, Claude may sometimes naturally try to wrap up work as it approaches the context limit. The following is an example prompt:

```text Sample prompt wrap
Your context window will be automatically compacted as it approaches its limit, allowing
you to continue working indefinitely from where you left off. Therefore, do not stop
tasks early due to token budget concerns. As you approach your token budget limit, save
your current progress and state to memory before the context window refreshes. Always be
as persistent and autonomous as possible and complete tasks fully, even if the end of
your budget is approaching. Never artificially stop any task early regardless of the
context remaining.
```

The [memory tool](/docs/en/agents-and-tools/tool-use/memory-tool) pairs well with context awareness for managing context transitions.

#### Workflows across multiple context windows

For tasks spanning multiple context windows:

1. **Use a different prompt for the very first context window:** Use the first context window to set up a framework (write tests, create setup scripts), then use future context windows to iterate on a todo-list.

2. **Have the model write tests in a structured format:** Ask Claude to create tests before starting work and keep track of them in a structured format (for example, `tests.json`). This leads to better long-term ability to iterate. Remind Claude of the importance of tests: "It is unacceptable to remove or edit tests because this could lead to missing or buggy functionality."

3. **Set up quality of life tools:** Encourage Claude to create setup scripts (for example, `init.sh`) to gracefully start servers, run test suites, and linters. This prevents repeated work when continuing from a fresh context window.

4. **Starting fresh versus compacting:** When a context window is cleared, consider starting with a brand new context window rather than using compaction. Claude's latest models are extremely effective at discovering state from the local filesystem. In some cases, you may want to take advantage of this over compaction. Be prescriptive about how it should start:

   * "Call pwd; you can only read and write files in this directory."
   * "Review progress.txt, tests.json, and the git logs."
   * "Manually run through a fundamental integration test before moving on to implementing new features."

5. **Provide verification tools:** As the length of autonomous tasks grows, Claude needs to verify correctness without continuous human feedback. Tools like Playwright MCP server or computer use capabilities for testing UIs are helpful.

6. **Encourage complete usage of context:** Prompt Claude to efficiently complete components before moving on:

```text Sample prompt wrap
This is a very long task, so it may be beneficial to plan out your work clearly. It's
encouraged to spend your entire output context working on the task - just make sure you
don't run out of context with significant uncommitted work. Continue working
systematically until you have completed this task.
```

#### State management best practices

* **Use structured formats for state data:** When tracking structured information (like test results or task status), use JSON or other structured formats to help Claude understand schema requirements.
* **Use unstructured text for progress notes:** Freeform progress notes work well for tracking general progress and context.
* **Use git for state tracking:** Git provides a log of what's been done and checkpoints that can be restored. Claude's latest models perform especially well in using git to track state across multiple sessions.
* **Emphasize incremental progress:** Explicitly ask Claude to keep track of its progress and focus on incremental work.

<Accordion title="Example: State tracking">
  ```json
  // Structured state file (tests.json)
  {
    "tests": [
      { "id": 1, "name": "authentication_flow", "status": "passing" },
      { "id": 2, "name": "user_management", "status": "failing" },
      { "id": 3, "name": "api_endpoints", "status": "not_started" }
    ],
    "total": 200,
    "passing": 150,
    "failing": 25,
    "not_started": 25
  }
  ```

  ```text wrap
  // Progress notes (progress.txt)
  Session 3 progress:
  - Fixed authentication token validation
  - Updated user model to handle edge cases
  - Next: investigate user_management test failures (test #2)
  - Note: Do not remove tests as this could lead to missing functionality
  ```
</Accordion>

### Balancing autonomy and safety

Without guidance, Claude Opus 4.6 may take actions that are difficult to reverse or affect shared systems, such as deleting files, force-pushing, or posting to external services. If you want Claude Opus 4.6 to confirm before taking potentially risky actions, add guidance to your prompt:

```text Sample prompt wrap
Consider the reversibility and potential impact of your actions. You are encouraged to
take local, reversible actions like editing files or running tests, but for actions that
are hard to reverse, affect shared systems, or could be destructive, ask the user before
proceeding.

Examples of actions that warrant confirmation:
- Destructive operations: deleting files or branches, dropping database tables, rm -rf
- Hard to reverse operations: git push --force, git reset --hard, amending published commits
- Operations visible to others: pushing code, commenting on PRs/issues, sending
messages, modifying shared infrastructure

When encountering obstacles, do not use destructive actions as a shortcut. For example,
don't bypass safety checks (e.g. --no-verify) or discard unfamiliar files that may be
in-progress work.
```

### Research and information gathering

Claude's latest models can find and synthesize information from multiple sources effectively. For optimal research results:

1. **Provide clear success criteria:** Define what constitutes a successful answer to your research question.

2. **Encourage source verification:** Ask Claude to verify information across multiple sources.

3. **For complex research tasks, use a structured approach:**

```text Sample prompt for complex research wrap
Search for this information in a structured way. As you gather data, develop several
competing hypotheses. Track your confidence levels in your progress notes to improve
calibration. Regularly self-critique your approach and plan. Update a hypothesis tree or
research notes file to persist information and provide transparency. Break down this
complex research task systematically.
```

This structured approach helps Claude work through large corpora methodically and iteratively critique its findings.

### Subagent orchestration

Claude's latest models orchestrate subagents natively. These models can recognize when tasks would benefit from delegating work to specialized subagents and do so proactively without requiring explicit instruction.

To take advantage of this behavior:

1. **Ensure well-defined subagent tools:** Have subagent tools available and described in tool definitions.
2. **Let Claude orchestrate naturally:** Claude will delegate appropriately without explicit instruction.
3. **Watch for overuse:** Claude Opus 4.6 has a strong predilection for subagents and may spawn them in situations where a simpler, direct approach would suffice. For example, the model may spawn subagents for code exploration when a direct grep call is faster and sufficient. Claude Opus 5 also delegates to subagents more readily than prior models; see [Controlling subagent spawning](/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5#controlling-subagent-spawning) for guidance and a sample damping prompt.

If you're seeing excessive subagent use, add explicit guidance about when subagents are and aren't warranted:

```text Sample prompt for subagent usage wrap
Use subagents when tasks can run in parallel, require isolated context, or involve
independent workstreams that don't need to share state. For simple tasks, sequential
operations, single-file edits, or tasks where you need to maintain context across steps,
work directly rather than delegating.
```

### Chain complex prompts

With adaptive thinking and subagent orchestration, Claude handles most multistep reasoning internally. Explicit prompt chaining (breaking a task into sequential API calls) is still useful when you need to inspect intermediate outputs or enforce a specific pipeline structure.

The most common chaining pattern is **self-correction:** generate a draft → have Claude review it against criteria → have Claude refine based on the review. Each step is a separate API call so you can log, evaluate, or branch at any point.

### Reduce file creation in agentic coding

Claude's latest models may sometimes create new files for testing and iteration purposes, particularly when working with code. This approach allows Claude to use files, especially Python scripts, as a 'temporary scratchpad' before saving its final output. Using temporary files can improve outcomes particularly for agentic coding use cases.

If you'd prefer to minimize net new file creation, you can instruct Claude to clean up after itself:

```text Sample prompt wrap
If you create any temporary new files, scripts, or helper files for iteration, clean up
these files by removing them at the end of the task.
```

### Overeagerness

Claude Opus 4.5 and Claude Opus 4.6 have a tendency to overengineer by creating extra files, adding unnecessary abstractions, or building in flexibility that wasn't requested. If you're seeing this undesired behavior, add specific guidance to keep solutions minimal.

For example:

```text Sample prompt to minimize overengineering wrap
Avoid over-engineering. Only make changes that are directly requested or clearly
necessary. Keep solutions simple and focused:

- Scope: Don't add features, refactor code, or make "improvements" beyond what was
asked. A bug fix doesn't need surrounding code cleaned up. A simple feature doesn't need
extra configurability.

- Documentation: Don't add docstrings, comments, or type annotations to code you didn't
change. Only add comments where the logic isn't self-evident.

- Defensive coding: Don't add error handling, fallbacks, or validation for scenarios
that can't happen. Trust internal code and framework guarantees. Only validate at system
boundaries (user input, external APIs).

- Abstractions: Don't create helpers, utilities, or abstractions for one-time
operations. Don't design for hypothetical future requirements. The right amount of
complexity is the minimum needed for the current task.
```

### Avoid focusing on passing tests and hardcoding

Claude can sometimes focus too heavily on making tests pass at the expense of more general solutions, or may use workarounds like helper scripts for complex refactoring instead of using standard tools directly. To prevent this behavior and get solutions that generalize:

```text Sample prompt wrap
Please write a high-quality, general-purpose solution using the standard tools
available. Do not create helper scripts or workarounds to accomplish the task more
efficiently. Implement a solution that works correctly for all valid inputs, not just
the test cases. Do not hard-code values or create solutions that only work for specific
test inputs. Instead, implement the actual logic that solves the problem generally.

Focus on understanding the problem requirements and implementing the correct algorithm.
Tests are there to verify correctness, not to define the solution. Provide a principled
implementation that follows best practices and software design principles.

If the task is unreasonable or infeasible, or if any of the tests are incorrect, please
inform me rather than working around them. The solution should be robust, maintainable,
and extendable.
```

### Minimizing hallucinations in agentic coding

Claude's latest models are less prone to hallucinations and give more accurate, grounded, intelligent answers based on the code. To encourage this behavior even more and minimize hallucinations:

```text Sample prompt wrap
<investigate_before_answering>
Never speculate about code you have not opened. If the user references a specific file,
you MUST read the file before answering. Make sure to investigate and read relevant
files BEFORE answering questions about the codebase. Never make any claims about code
before investigating unless you are certain of the correct answer - give grounded and
hallucination-free answers.
</investigate_before_answering>
```

## Capability-specific tips

### Improved vision capabilities

Claude Opus 4.5 and Claude Opus 4.6 have improved vision capabilities compared to previous Claude models. They perform better on image processing and data extraction tasks, particularly when there are multiple images present in context. These improvements carry over to computer use, where the models can more reliably interpret screenshots and UI elements. You can also use these models to analyze videos by breaking them up into frames.

One technique that has proven effective to further boost performance is to give Claude a crop tool or [agent skill](/docs/en/agents-and-tools/agent-skills/overview). Testing has shown consistent uplift on image evaluations when Claude is able to "zoom" in on relevant regions of an image. Anthropic has created a [recipe for the crop tool](https://platform.claude.com/cookbook/multimodal-crop-tool).

### Frontend design

Claude Opus 4.5 and Claude Opus 4.6 build complex, real-world web applications with strong frontend design. However, without guidance, models can default to generic patterns that create what users call the "AI slop" aesthetic. To create distinctive, creative frontends that surprise and delight:

<Tip>
  For a detailed guide on improving frontend design, see the blog post on [improving frontend design through skills](https://www.claude.com/blog/improving-frontend-design-through-skills).
</Tip>

For frontend design work outside the API, [Claude Design](https://support.claude.com/en/articles/14604416-get-started-with-claude-design) provides a canvas and design tools where Claude generates and iterates on designs interactively.

Here's a system prompt snippet you can use to encourage better frontend design:

```text Sample prompt for frontend aesthetics wrap
<frontend_aesthetics>
You tend to converge toward generic, "on distribution" outputs. In frontend design, this
creates what users call the "AI slop" aesthetic. Avoid this: make creative, distinctive
frontends that surprise and delight.

Focus on:
- Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic
fonts like Arial and Inter; opt instead for distinctive choices that elevate the
frontend's aesthetics.
- Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency.
Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw
from IDE themes and cultural aesthetics for inspiration.
- Motion: Use animations for effects and micro-interactions. Prioritize CSS-only
solutions for HTML. Use Motion library for React when available. Focus on high-impact
moments: one well-orchestrated page load with staggered reveals (animation-delay)
creates more delight than scattered micro-interactions.
- Backgrounds: Create atmosphere and depth rather than defaulting to solid colors. Layer
CSS gradients, use geometric patterns, or add contextual effects that match the overall
aesthetic.

Avoid generic AI-generated aesthetics:
- Overused font families (Inter, Roboto, Arial, system fonts)
- Clichéd color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character

Interpret creatively and make unexpected choices that feel genuinely designed for the
context. Vary between light and dark themes, different fonts, different aesthetics. You
still tend to converge on common choices (Space Grotesk, for example) across
generations. Avoid this: it is critical that you think outside the box!
</frontend_aesthetics>
```

You can also refer to the [full skill definition](https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md).

## Migration considerations

When migrating to current Claude models from earlier generations:

1. **Be specific about desired behavior:** Consider describing exactly what you'd like to see in the output.

2. **Frame your instructions with modifiers:** Adding modifiers that encourage Claude to increase the quality and detail of its output can help better shape Claude's performance. For example, instead of "Create an analytics dashboard", use "Create an analytics dashboard. Include as many relevant features and interactions as possible. Go beyond the basics to create a fully-featured implementation."

3. **Request specific features explicitly:** Animations and interactive elements should be requested explicitly when desired.

4. **Update thinking configuration:** Claude 4.6 models use [adaptive thinking](/docs/en/build-with-claude/thinking) (`thinking: {type: "adaptive"}`) instead of manual thinking with `budget_tokens`. Use the [effort parameter](/docs/en/build-with-claude/effort) to control thinking depth.

5. **Migrate away from prefilled responses:** Prefilled responses on the last assistant turn are no longer supported starting with Claude 4.6 models and Claude Mythos Preview. See [Migrating away from prefilled responses](#migrating-away-from-prefilled-responses) for detailed guidance on alternatives.

6. **Tune anti-laziness prompting:** If your prompts previously encouraged the model to be more thorough or use tools more aggressively, dial back that guidance. Claude 4.6 models are more proactive and may overtrigger on instructions that were needed for previous models.

For detailed migration steps, see the [Migration guide](/docs/en/about-claude/models/migration-guide).

### Migrating to Claude Sonnet 5 from Claude Sonnet 4.5 or earlier

See [Migrating to Claude Sonnet 5 from Claude Sonnet 4.5 or earlier](/docs/en/about-claude/models/migration-guide#migrating-from-sonnet-45) in the migration guide, which covers the effort default change and the removal of manual extended thinking (`budget_tokens`).

## Next steps

<CardGroup cols={2}>
  <Card title="Prompting Claude Fable 5" icon="terminal" href="/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5">
    Behavioral differences and prompting patterns for Claude Fable 5 and Claude Mythos 5, covering effort, instruction following, long runs, memory, and scaffolding changes.
  </Card>

  <Card title="Prompting Claude Sonnet 5" icon="terminal" href="/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5">
    Behavioral differences and prompting patterns for Claude Sonnet 5, covering effort, adaptive thinking defaults, tool use, and migration from Claude Sonnet 4.6.
  </Card>

  <Card title="Prompting Claude Opus 5" icon="terminal" href="/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5">
    Behavioral differences and prompting patterns for Claude Opus 5, covering response verbosity, agentic narration, task scoping, subagent delegation, and self-correction.
  </Card>

  <Card title="Prompt engineering overview" icon="edit" href="/docs/en/build-with-claude/prompt-engineering/overview">
    When to use prompt engineering and how to plan your approach before tuning prompts.
  </Card>
</CardGroup>

---

SOURCE: platform.claude.com docs — glossary

# Glossary

These concepts are not unique to Anthropic’s language models, but this page presents a brief summary of key terms.

---

## Context window

The "context window" refers to the amount of text a language model can look back on and reference when generating new text. This is different from the large corpus of data the language model was trained on, and instead represents a "working memory" for the model. A larger context window allows the model to process and respond to more complex and lengthy prompts, while a smaller context window may limit the model's ability to handle longer prompts or maintain coherence over extended conversations.

See the [guide to understanding context windows](/docs/en/build-with-claude/context-windows) to learn more.

## Fine-tuning

Fine-tuning is the process of further training a pretrained language model using additional data. This causes the model to start representing and mimicking the patterns and characteristics of the fine-tuning dataset. Claude is not a bare language model; it has already been fine-tuned to be a helpful assistant. The Claude API does not currently offer fine-tuning, but ask your Anthropic contact if you are interested in exploring this option. Fine-tuning can be useful for adapting a language model to a specific domain, task, or writing style, but it requires careful consideration of the fine-tuning data and the potential impact on the model's performance and biases.

## HHH

These three H's represent Anthropic's goals in ensuring that Claude is beneficial to society:

* A **helpful** AI will attempt to perform the task or answer the question posed to the best of its abilities, providing relevant and useful information.
* An **honest** AI will give accurate information, and not hallucinate or confabulate. It will acknowledge its limitations and uncertainties when appropriate.
* A **harmless** AI will not be offensive or discriminatory, and when asked to aid in a dangerous or unethical act, the AI should politely refuse and explain why it cannot comply.

## Latency

Latency, in the context of generative AI and large language models, refers to the time it takes for the model to respond to a given prompt. It is the delay between submitting a prompt and receiving the generated output. Lower latency indicates faster response times, which is crucial for real-time applications, chatbots, and interactive experiences. Factors that can affect latency include model size, hardware capabilities, network conditions, and the complexity of the prompt and the generated response.

## LLM

Large language models (LLMs) are AI language models with many parameters that are capable of performing a variety of surprisingly useful tasks. These models are trained on vast amounts of text data and can generate human-like text, answer questions, summarize information, and more. Claude is a conversational assistant based on a large language model that has been fine-tuned and trained using RLHF to be more helpful, honest, and harmless.

## MCP (Model Context Protocol)

Model Context Protocol (MCP) is an open protocol that standardizes how applications provide context to LLMs. Like a USB-C port for AI applications, MCP provides a unified way to connect AI models to different data sources and tools. MCP enables AI systems to maintain consistent context across interactions and access external resources in a standardized manner. See the [MCP documentation](/docs/en/mcp) to learn more.

## MCP connector

The MCP connector is a feature that allows API users to connect to MCP servers directly from the Messages API without building an MCP client. This enables seamless integration with MCP-compatible tools and services through the Claude API. The MCP connector supports features such as tool calling and is available in beta. See the [MCP connector](/docs/en/agents-and-tools/mcp-connector) documentation to learn more.

## Pretraining

Pretraining is the initial process of training language models on a large unlabeled corpus of text. In Claude's case, autoregressive language models (such as Claude's underlying model) are pretrained to predict the next word, given the previous context of text in the document. These pretrained models are not inherently good at answering questions or following instructions, and often require deep skill in prompt engineering to elicit desired behaviors. Fine-tuning and RLHF are used to refine these pretrained models, making them more useful for a wide range of tasks.

## RAG (Retrieval augmented generation)

Retrieval augmented generation (RAG) is a technique that combines information retrieval with language model generation to improve the accuracy and relevance of the generated text, and to better ground the model's response in evidence. In RAG, a language model is augmented with an external knowledge base or a set of documents that is passed into the context window. The data is retrieved at runtime when a query is sent to the model, although the model itself does not necessarily retrieve the data (but can with [tool use](/docs/en/agents-and-tools/tool-use/overview) and a retrieval function). When generating text, relevant information first must be retrieved from the knowledge base based on the input prompt, and then passed to the model along with the original query. The model uses this information to guide the output it generates. This allows the model to access and use information beyond its training data, reducing the reliance on memorization and improving the factual accuracy of the generated text. RAG can be particularly useful for tasks that require up-to-date information, domain-specific knowledge, or explicit citation of sources. However, the effectiveness of RAG depends on the quality and relevance of the external knowledge base and the knowledge that is retrieved at runtime.

## RLHF

Reinforcement Learning from Human Feedback (RLHF) is a technique used to train a pretrained language model to behave in ways that are consistent with human preferences. This can include helping the model follow instructions more effectively or act more like a chatbot. Human feedback consists of ranking a set of two or more example texts, and the reinforcement learning process encourages the model to prefer outputs that are similar to the higher-ranked ones. Claude has been trained using RLHF to be a more helpful assistant. For more details, you can read [Anthropic's paper on the subject](https://arxiv.org/abs/2204.05862).

## Temperature

Temperature is a parameter that controls the randomness of a model's predictions during text generation. Higher temperatures lead to more creative and diverse outputs, allowing for multiple variations in phrasing and, in the case of fiction, variation in answers as well. Lower temperatures result in more conservative and deterministic outputs that stick to the most probable phrasing and answers. Adjusting the temperature enables users to encourage a language model to explore rare, uncommon, or surprising word choices and sequences, rather than only selecting the most likely predictions.

Users may encounter non-determinism in APIs. Even with temperature set to 0, the results will not be fully deterministic and identical inputs may produce different outputs across API calls. This applies both to Anthropic's first-party inference service and to inference through third-party cloud providers.

## TTFT (Time to first token)

Time to First Token (TTFT) is a performance metric that measures the time it takes for a language model to generate the first token of its output after receiving a prompt. It is an important indicator of the model's responsiveness and is particularly relevant for interactive applications, chatbots, and real-time systems where users expect quick initial feedback. A lower TTFT indicates that the model can start generating a response faster, providing a more seamless and engaging user experience. Factors that can influence TTFT include model size, hardware capabilities, network conditions, and the complexity of the prompt.

## Tokens

Tokens are the smallest individual units of a language model, and can correspond to words, subwords, characters, or even bytes (in the case of Unicode). For Claude, a token approximately represents 3.5 English characters, though the exact number can vary depending on the language used. Tokens are typically hidden when interacting with language models at the "text" level but become relevant when examining the exact inputs and outputs of a language model. When Claude is provided with text to evaluate, the text (consisting of a series of characters) is encoded into a series of tokens for the model to process. Larger tokens enable data efficiency during inference and pretraining (and are used when possible), while smaller tokens allow a model to handle uncommon or never-before-seen words. The choice of tokenization method can impact the model's performance, vocabulary size, and ability to handle out-of-vocabulary words.

---

SOURCE: platform.claude.com docs — models-overview

# Models overview

Claude is a family of state-of-the-art large language models developed by Anthropic. This guide introduces the available models and compares their performance.

---

## Choosing a model

If you're unsure which model to use, start with **Claude Opus 5** for complex agentic coding and enterprise work. For workloads that need the highest available capability, use [Claude Fable 5](#claude-fable-5-and-claude-mythos-5).

All current Claude models support text and image input, text output, multilingual capabilities, and vision. Models are available through the Claude API, [Amazon Bedrock](/docs/en/build-with-claude/claude-in-amazon-bedrock), [Claude Platform on AWS](/docs/en/build-with-claude/claude-platform-on-aws), [Google Cloud](/docs/en/build-with-claude/claude-on-vertex-ai), and [Microsoft Foundry](/docs/en/build-with-claude/claude-in-microsoft-foundry).

Once you've picked a model, [learn how to make your first API call](/docs/en/get-started).

### Claude Fable 5 and Claude Mythos 5

Claude Fable 5 (`claude-fable-5`) is Anthropic's most capable widely released model. Claude Mythos 5 (`claude-mythos-5`) shares Claude Fable 5's specs and pricing and joins the invitation-only Claude Mythos Preview (`claude-mythos-preview`) within [Project Glasswing](https://anthropic.com/glasswing). See [Introducing Claude Fable 5 and Claude Mythos 5](/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5) for launch details and API changes.

Claude Fable 5 is generally available on the Claude API, Amazon Bedrock, Claude Platform on AWS, Google Cloud, and Microsoft Foundry beginning June 9, 2026. Claude Mythos 5 is not generally available: it is offered in limited availability to approved customers in [Project Glasswing](https://anthropic.com/glasswing), beginning the same day. For access, contact your Anthropic, AWS, or Google Cloud account team.

### Latest models comparison

| Feature                                                                                            | Claude Fable 5                                                                                                                                                                                                                                                                                 | Claude Opus 5                                                                        | Claude Sonnet 5                                                                      | Claude Haiku 4.5                                                                       |
| -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| **Description**                                                                                    | Next-generation intelligence for long-running agents                                                                                                                                                                                                                                           | For complex agentic coding and enterprise work                                       | The best combination of speed and intelligence                                       | The fastest model with near-frontier intelligence                                      |
| **Claude API ID**                                                                                  | claude-fable-5                                                                                                                                                                                                                                                                                 | claude-opus-5                                                                        | claude-sonnet-5                                                                      | claude-haiku-4-5-20251001                                                              |
| **Claude API alias**                                                                               | claude-fable-5                                                                                                                                                                                                                                                                                 | claude-opus-5                                                                        | claude-sonnet-5                                                                      | claude-haiku-4-5                                                                       |
| **AWS Bedrock ID**                                                                                 | anthropic.claude-fable-53                                                                                                                                                                                                                                                                      | anthropic.claude-opus-53                                                             | anthropic.claude-sonnet-53                                                           | anthropic.claude-haiku-4-5-20251001-v1:0                                               |
| **Google Cloud ID**                                                                                | claude-fable-5                                                                                                                                                                                                                                                                                 | claude-opus-5                                                                        | claude-sonnet-5                                                                      | claude-haiku-4-5\@20251001                                                             |
| **Pricing**1                                                                                       | $10 / input MTok $50 / output MTok                                                                                                                                                                                                                                                             | $5 / input MTok $25 / output MTok                                                    | $3 / input MTok $15 / output MTok4                                                   | $1 / input MTok $5 / output MTok                                                       |
| **[Extended thinking (`thinking.type: "enabled"`)](/docs/en/build-with-claude/extended-thinking)** | No                                                                                                                                                                                                                                                                                             | No                                                                                   | No                                                                                   | Yes                                                                                    |
| **[Adaptive thinking](/docs/en/build-with-claude/thinking)**                                       | Yes (always on)                                                                                                                                                                                                                                                                                | Yes                                                                                  | Yes                                                                                  | No                                                                                     |
| **Comparative latency**                                                                            | Slower                                                                                                                                                                                                                                                                                         | Moderate                                                                             | Fast                                                                                 | Fastest                                                                                |
| **Context window**                                                                                 | <Tooltip tooltipContent="~555k words \ ~2.5M unicode characters. Claude Fable 5 uses the tokenizer introduced with Claude Opus 4.7; compared to models before Claude Opus 4.7, the same text produces roughly 30% more tokens. The exact increase depends on the content.">1M tokens</Tooltip> | <Tooltip tooltipContent="~555k words \ ~2.5M unicode characters">1M tokens</Tooltip> | <Tooltip tooltipContent="~555k words \ ~2.5M unicode characters">1M tokens</Tooltip> | <Tooltip tooltipContent="~150k words \ ~680k unicode characters">200k tokens</Tooltip> |
| **Max output**                                                                                     | 128k tokens                                                                                                                                                                                                                                                                                    | 128k tokens                                                                          | 128k tokens                                                                          | 64k tokens                                                                             |
| **Reliable knowledge cutoff**                                                                      | Jan 20262                                                                                                                                                                                                                                                                                      | May 20262                                                                            | Jan 20262                                                                            | Feb 2025                                                                               |
| **Training data cutoff**                                                                           | Jan 2026                                                                                                                                                                                                                                                                                       | May 2026                                                                             | Jan 2026                                                                             | Jul 2025                                                                               |

*1 See [Pricing](/docs/en/about-claude/pricing) for complete pricing information including Batch API discounts and prompt caching rates.*

*2 **Reliable knowledge cutoff** indicates the date through which a model's knowledge is most extensive and reliable. **Training data cutoff** is the broader date range of training data used. For more information, see [Anthropic's Transparency Hub](https://www.anthropic.com/transparency).*

*3 Claude Fable 5, Claude Opus 5, and Claude Sonnet 5 are available on Bedrock through [Claude in Amazon Bedrock](/docs/en/build-with-claude/claude-in-amazon-bedrock) (the Messages-API Bedrock endpoint).*

*4 Introductory pricing of $2 / $10 per MTok applies to Claude Sonnet 5 through August 31, 2026. See [Pricing](/docs/en/about-claude/pricing#claude-sonnet-5-introductory-pricing).*

<Info>
  Claude Mythos 5 and Claude Mythos Preview are offered separately for defensive cybersecurity workflows as part of [Project Glasswing](https://anthropic.com/glasswing). Access is invitation-only and there is no self-serve sign-up.
</Info>

<Note>
  Every Claude model ID is a pinned snapshot. Models with a date in the ID (for example, 

  `20250929`

  ) are fixed to that specific release. Starting with the Claude 4.6 generation, model IDs use a dateless format that is also a pinned snapshot, not an evergreen pointer. For models before the 4.6 generation, entries in the Claude API alias column are convenience pointers that resolve to a dated model ID. For details on the naming convention and how versioning works, see 

  [Model IDs and versioning](/docs/en/about-claude/models/model-ids-and-versions)

  .
</Note>

<Note>
  Starting with 

  **Claude Sonnet 4.5 and all subsequent models**

   (including Claude Sonnet 4.6), Bedrock offers two endpoint types: 

  **global endpoints**

   (dynamic routing for maximum availability) and 

  **regional endpoints**

   (guaranteed data routing through specific geographic regions). Google Cloud offers three endpoint types: global endpoints, 

  **multi-region endpoints**

   (dynamic routing within a geographic area), and regional endpoints. For more information, see 

  [Cloud platform pricing](/docs/en/about-claude/pricing#cloud-platform-pricing)

  .
</Note>

<Note>
  **Claude Platform on AWS**

   uses the same model IDs as the Claude API (for example, 

  `claude-opus-4-6`

  ), not Bedrock-style IDs. Model lifecycle on Claude Platform on AWS follows Anthropic's first-party 

  [Model deprecations](/docs/en/about-claude/model-deprecations)

  , not Bedrock's. See 

  [Available models](/docs/en/build-with-claude/claude-platform-on-aws#available-models)

   for the model list.
</Note>

<Tip>
  You can query model capabilities and token limits programmatically with the [Models API](/docs/en/api/models/list). The response includes `max_input_tokens`, `max_tokens`, and a `capabilities` object for every available model.
</Tip>

<Note>
  On Claude Opus 4.8, the `effort` parameter defaults to `high` on all surfaces, including the Claude API, Claude Code, and claude.ai. On Claude Opus 5 and Claude Sonnet 5, it defaults to `high` on the Claude API and Claude Code. Set `effort` explicitly to use a different level. See [Effort](/docs/en/build-with-claude/effort) for guidance on choosing a level.
</Note>

<Note>
  The Max output values in the table apply to the synchronous Messages API. On the [Message Batches API](/docs/en/build-with-claude/batch-processing#extended-output-beta), Claude Opus 5, Opus 4.8, Opus 4.7, Opus 4.6, Sonnet 5, and Sonnet 4.6 support up to 300k output tokens by using the `output-300k-2026-03-24` beta header.
</Note>

<AccordionGroup>
  <Accordion title="Legacy models">
    The following models are still available. Consider migrating to current models for improved performance:

    | Feature                                                                                            | Claude Opus 4.8                                                                      | Claude Opus 4.7                                                                                                      | Claude Opus 4.6                                                                      | Claude Sonnet 4.6                                                                    | Claude Sonnet 4.5                                                                      | Claude Opus 4.5                                                                        | Claude Opus 4.1 (deprecated)                                                           |
    | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
    | **Claude API ID**                                                                                  | claude-opus-4-8                                                                      | claude-opus-4-7                                                                                                      | claude-opus-4-6                                                                      | claude-sonnet-4-6                                                                    | claude-sonnet-4-5-20250929                                                             | claude-opus-4-5-20251101                                                               | claude-opus-4-1-20250805                                                               |
    | **Claude API alias**                                                                               | claude-opus-4-8                                                                      | claude-opus-4-7                                                                                                      | claude-opus-4-6                                                                      | claude-sonnet-4-6                                                                    | claude-sonnet-4-5                                                                      | claude-opus-4-5                                                                        | claude-opus-4-1                                                                        |
    | **AWS Bedrock ID**                                                                                 | anthropic.claude-opus-4-86                                                           | anthropic.claude-opus-4-76                                                                                           | anthropic.claude-opus-4-6-v1                                                         | anthropic.claude-sonnet-4-6                                                          | anthropic.claude-sonnet-4-5-20250929-v1:0                                              | anthropic.claude-opus-4-5-20251101-v1:0                                                | anthropic.claude-opus-4-1-20250805-v1:0                                                |
    | **Google Cloud ID**                                                                                | claude-opus-4-8                                                                      | claude-opus-4-7                                                                                                      | claude-opus-4-6                                                                      | claude-sonnet-4-6                                                                    | claude-sonnet-4-5\@20250929                                                            | claude-opus-4-5\@20251101                                                              | claude-opus-4-1\@20250805                                                              |
    | **Pricing**                                                                                        | $5 / input MTok $25 / output MTok                                                    | $5 / input MTok $25 / output MTok                                                                                    | $5 / input MTok $25 / output MTok                                                    | $3 / input MTok $15 / output MTok                                                    | $3 / input MTok $15 / output MTok                                                      | $5 / input MTok $25 / output MTok                                                      | $15 / input MTok $75 / output MTok                                                     |
    | **[Extended thinking (`thinking.type: "enabled"`)](/docs/en/build-with-claude/extended-thinking)** | No                                                                                   | No                                                                                                                   | Yes (deprecated)                                                                     | Yes (deprecated)                                                                     | Yes                                                                                    | Yes                                                                                    | Yes                                                                                    |
    | **[Adaptive thinking](/docs/en/build-with-claude/thinking)**                                       | Yes                                                                                  | Yes                                                                                                                  | Yes                                                                                  | Yes                                                                                  | No                                                                                     | No                                                                                     | No                                                                                     |
    | **Comparative latency**                                                                            | Moderate                                                                             | Moderate                                                                                                             | Moderate                                                                             | Fast                                                                                 | Fast                                                                                   | Moderate                                                                               | Moderate                                                                               |
    | **Context window**                                                                                 | <Tooltip tooltipContent="~555k words \ ~2.5M unicode characters">1M tokens</Tooltip> | <Tooltip tooltipContent="~555k words \ ~2.5M unicode characters (Opus 4.7 uses a new tokenizer)">1M tokens</Tooltip> | <Tooltip tooltipContent="~750k words \ ~3.4M unicode characters">1M tokens</Tooltip> | <Tooltip tooltipContent="~750k words \ ~3.4M unicode characters">1M tokens</Tooltip> | <Tooltip tooltipContent="~150k words \ ~680k unicode characters">200k tokens</Tooltip> | <Tooltip tooltipContent="~150k words \ ~680k unicode characters">200k tokens</Tooltip> | <Tooltip tooltipContent="~150k words \ ~680k unicode characters">200k tokens</Tooltip> |
    | **Max output**                                                                                     | 128k tokens                                                                          | 128k tokens                                                                                                          | 128k tokens                                                                          | 128k tokens                                                                          | 64k tokens                                                                             | 64k tokens                                                                             | 32k tokens                                                                             |
    | **Reliable knowledge cutoff**                                                                      | Jan 20265                                                                            | Jan 20265                                                                                                            | May 20255                                                                            | Aug 20255                                                                            | Jan 20255                                                                              | May 20255                                                                              | Jan 20255                                                                              |
    | **Training data cutoff**                                                                           | Jan 2026                                                                             | Jan 2026                                                                                                             | Aug 2025                                                                             | Jan 2026                                                                             | Jul 2025                                                                               | Aug 2025                                                                               | Mar 2025                                                                               |

    <Warning>
      Claude Opus 4.1 (`claude-opus-4-1-20250805`) is deprecated and will be retired on August 5, 2026. Migrate to [Claude Opus 5](/docs/en/about-claude/models/migration-guide#migrating-from-claude-opus-4-8-to-claude-opus-5) before the retirement date.

      See [model deprecations](/docs/en/about-claude/model-deprecations) for details.
    </Warning>

    *5 **Reliable knowledge cutoff** indicates the date through which a model's knowledge is most extensive and reliable. **Training data cutoff** is the broader date range of training data used.*

    *6 Claude Opus 4.8 and Claude Opus 4.7 are available on Bedrock through [Claude in Amazon Bedrock](/docs/en/build-with-claude/claude-in-amazon-bedrock) (the Messages-API Bedrock endpoint).*
  </Accordion>
</AccordionGroup>

## Prompt and output performance

Current Claude models excel in:

* **Performance:** Top-tier results in reasoning, coding, multilingual tasks, long-context handling, honesty, and image processing. See [Prompting best practices](/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) for general and model-specific prompting guidance.

* **Engaging responses:** Claude models are ideal for applications that require rich, human-like interactions.

  * If you prefer more concise responses, you can adjust your prompts to guide the model toward the desired output length. Refer to the [prompt engineering guides](/docs/en/build-with-claude/prompt-engineering) for details.
  * For prompting best practices, see [Prompting best practices](/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices).

* **Output quality:** When migrating from a previous model generation, you may notice larger improvements in overall performance.

## Migrating to Claude Opus 5

If you're currently using Claude Opus 4.8 or earlier Claude models, see [Migrating to Claude Opus 5](/docs/en/about-claude/models/migration-guide#migrating-from-claude-opus-4-8-to-claude-opus-5).

## Get started with Claude

If you're ready to start exploring what Claude can do for you, dive in! Whether you're a developer looking to integrate Claude into your applications or a user wanting to experience the power of AI firsthand, the following resources can help.

<Note>
  Looking to chat with Claude? Visit 

  [claude.ai](https://claude.ai)

  !
</Note>

<CardGroup cols={3}>
  <Card title="Intro to Claude" icon="check" href="/docs/en/intro">
    Explore Claude's capabilities and development flow.
  </Card>

  <Card title="Quickstart" icon="lightning" href="/docs/en/get-started">
    Learn how to make your first API call in minutes.
  </Card>

  <Card title="Claude Console" icon="code" href="/">
    Craft and test powerful prompts directly in your browser.
  </Card>
</CardGroup>

If you have any questions or need assistance, don't hesitate to reach out to the [support team](https://support.claude.com/) or consult the [Discord community](https://www.anthropic.com/discord).

---

SOURCE: platform.claude.com docs — prompt-engineering-overview

# Prompt engineering overview

Learn when prompt engineering is the right solution, and find Claude prompting techniques and interactive tutorials.

---

## Before prompt engineering

This guide assumes that you have:

1. A clear definition of the success criteria for your use case
2. Some ways to empirically test against those criteria
3. A first draft prompt you want to improve

If not, spend time establishing that first. Check out [Define success criteria and build evaluations](/docs/en/test-and-evaluate/develop-tests) for tips and guidance.

<CardGroup cols={2}>
  <Card title="Prompt generator notebook" icon="link" href="https://colab.research.google.com/github/anthropics/claude-cookbooks/blob/main/misc/metaprompt.ipynb">
    Don't have a first draft prompt? Generate one with the metaprompt recipe from the Claude Cookbook.
  </Card>

  <Card title="Prompting best practices" icon="link" href="/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices">
    For model-specific tuning guidance for Claude's latest models, start here.
  </Card>
</CardGroup>

***

## When to prompt engineer

This guide focuses on success criteria that are controllable through prompt engineering. Not every success criteria or failing eval is best solved by prompt engineering. For example, you can sometimes improve latency and cost more easily by selecting a different model.

***

## How to prompt engineer

All prompting techniques (from clarity and examples to XML structuring, role prompting, thinking, and prompt chaining) are covered in [Prompting best practices](/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices). That's the living reference; start there.

For general prompt engineering craft beyond Claude-specific techniques, see the blog post on [best practices for prompt engineering](https://claude.com/blog/best-practices-for-prompt-engineering).

***

## Prompt engineering tutorial

If you're an interactive learner, you can start with the interactive tutorials instead!

<CardGroup cols={2}>
  <Card title="GitHub prompting tutorial" icon="link" href="https://github.com/anthropics/prompt-eng-interactive-tutorial">
    An example-filled tutorial that covers the prompt engineering concepts found in the docs.
  </Card>

  <Card title="Google Sheets prompting tutorial" icon="link" href="https://docs.google.com/spreadsheets/d/19jzLgRruG9kjUQNKtCg1ZjdD6l6weA6qRXG5zLIAhC8">
    A lighter-weight version of the prompt engineering tutorial, as an interactive spreadsheet.
  </Card>
</CardGroup>

---

SOURCE: platform.claude.com docs — prompting-claude-fable-5

# Prompting Claude Fable 5

Behavioral differences and prompting patterns for Claude Fable 5 and Claude Mythos 5, covering effort, instruction following, long runs, memory, and scaffolding changes.

---

This guide covers the prompting and scaffolding patterns specific to Claude Fable 5 and Claude Mythos 5. For the model's capabilities, API changes, pricing, and availability, see [Introducing Claude Fable 5 and Claude Mythos 5](/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5). For techniques that apply across all current Claude models, see [Prompting best practices](/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices).

Claude Fable 5 takes on problems that were previously too complex, long-running, or ambiguous for prior models, and is particularly effective at end-to-end work that takes a person hours, days, or weeks to complete. The teams seeing the best outcomes apply Claude Fable 5 to their hardest unsolved problems; testing it only on simpler workloads tends to undersell its capability range. It also performs reliably on more straightforward tasks.

Claude Fable 5 has several behavioral differences from Claude Opus 4.8 that may require prompt or scaffolding updates. Capability improvements at this level are also a good prompt to re-evaluate which instructions, tools, and guardrails are still needed. The patterns below cover the behaviors that most often require tuning.

<Note>
  For API parameter changes specific to Claude Fable 5 and Claude Mythos 5 (adaptive thinking only, summarized-only thinking output, no extended thinking budgets, the `refusal` stop reason and fallback handling), see [Introducing Claude Fable 5 and Claude Mythos 5](/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5).

  Claude Fable 5 runs safety classifiers that target offensive cybersecurity techniques (such as building exploits, malware, or attack tooling), biology and life sciences content (such as lab methods or molecular mechanisms), and extraction of the model's summarized thinking. Benign cybersecurity work and beneficial life sciences tasks may also trigger these safeguards. To re-route declined requests automatically, configure [server-side or client-side fallback](/docs/en/build-with-claude/refusals-and-fallback) to Claude Opus 4.8.
</Note>

## Capability improvements

Compared with Claude Opus 4.8, Claude Fable 5 shows improvement in:

* **Long-horizon autonomy.** Claude Fable 5 sustains productive output over extended periods, completing multiday, goal-directed runs with strong instruction retention across long, complex tasks.
* **First-shot correctness on complex, well-specified problems.** Early testers reported single-pass implementations of systems that previously took days of iteration.
* **Vision.** Claude Fable 5 interprets dense technical images, web applications, and detailed screenshots with substantially higher accuracy, often while using fewer output tokens, and is trained to use bash and crop tools to handle flipped, blurry, or noisy images.
* **Enterprise workflows.** Claude Fable 5 follows instructions, stays in scope, and produces professional-grade output on financial analysis, spreadsheets, slides, and documents.
* **Code review and debugging.** Bug-finding recall (outside the cybersecurity domains the safety classifiers cover) is noticeably higher than Claude Opus 4.8, including search across codebases and repository history.
* **Navigating ambiguity.** Claude Fable 5 performs well when given complex, multithreaded requests and asked to determine next steps.
* **Delegation and collaboration.** Claude Fable 5 is significantly more dependable at dispatching and sustaining parallel subagents, and reliably manages ongoing communication with long-running subagents and peer agents.

Beyond these specific improvements, Claude Fable 5 is generally more capable than prior models on almost all tasks. Claude Fable 5 is not intended for offensive cybersecurity or biology and life sciences work; requests in those domains can return [`stop_reason: "refusal"`](/docs/en/build-with-claude/refusals-and-fallback).

## Longer turns by default

Individual requests on hard tasks can run for many minutes at higher [effort](/docs/en/build-with-claude/effort) settings, especially when the task requires gathering context, building, and self-verifying, and autonomous runs can extend for hours. This is one of the largest shifts teams encounter when adjusting to Claude Fable 5. Adjust client timeouts, streaming, and user-facing progress indicators before migrating, and consider restructuring harnesses to check on runs asynchronously, for example through scheduled jobs, rather than blocking. To keep Claude Fable 5 from overplanning when a task is ambiguous:

```text wrap
When you have enough information to act, act. Do not re-derive facts already established in the conversation, re-litigate a decision the user has already made, or narrate options you will not pursue in user-facing messages. If you are weighing a choice, give a recommendation, not an exhaustive survey. This does not apply to thinking blocks.
```

## Consider all effort levels

[Effort](/docs/en/build-with-claude/effort) is the primary control for the trade-off between intelligence, latency, and cost on Claude Fable 5. Use `high` as the default for most tasks, with `xhigh` for the most capability-sensitive workloads and `medium` or `low` for routine work. Lower effort settings on Claude Fable 5 still perform well and often exceed `xhigh` performance on prior models. Reduce effort if a task completes but takes longer than necessary, or if you want a quicker, more interactive working style.

On routine work at higher effort, Claude Fable 5 can gather context and deliberate beyond what the task needs. At the same time, higher effort often produces excellent verification behavior, sophisticated reasoning, and the most rigorous output. To prevent unrequested tidying or refactoring at higher effort:

```text wrap
Don't add features, refactor, or introduce abstractions beyond what the task requires. A bug fix doesn't need surrounding cleanup and a one-shot operation usually doesn't need a helper. Don't design for hypothetical future requirements: do the simplest thing that works well. Avoid premature abstraction and half-finished implementations. Don't add error handling, fallbacks, or validation for scenarios that cannot happen. Trust internal code and framework guarantees. Only validate at system boundaries (user input, external APIs). Don't use feature flags or backwards-compatibility shims when you can just change the code.
```

## Strong instruction following

Instruction-following is improved enough that you can steer most behaviors with a brief instruction rather than enumerating each behavior by name. For example, when un-steered, Claude Fable 5 can elaborate beyond what the task needs, especially at higher effort settings: surveying options it won't pursue, explaining root causes at length, producing heavily-structured PR descriptions, or writing comments that narrate what the next line does. A short brevity instruction is as effective as listing each pattern:

```text wrap
Lead with the outcome. Your first sentence after finishing should answer "what happened" or "what did you find": the thing the user would ask for if they said "just give me the TLDR." Supporting detail and reasoning come after. Being readable and being concise are different things, and readability matters more.

The way to keep output short is to be selective about what you include (drop details that don't change what the reader would do next), not to compress the writing into fragments, abbreviations, arrow chains like A → B → fails, or jargon.
```

The same applies to checkpoint behavior in long-running workflows. To have Claude Fable 5 stop only where it genuinely needs you, there is no need to enumerate every case:

```text wrap
Pause for the user only when the work genuinely requires them: a destructive or irreversible action, a real scope change, or input that only they can provide. If you hit one of these, ask and end the turn, rather than ending on a promise.
```

## Ground progress claims during long runs

On long autonomous runs, instruct Claude Fable 5 to audit progress against actual tool results. In Anthropic's testing, this nearly eliminated fabricated status reports even on tasks designed to elicit them:

```text wrap
Before reporting progress, audit each claim against a tool result from this session. Only report work you can point to evidence for; if something is not yet verified, say so explicitly. Report outcomes faithfully: if tests fail, say so with the output; if a step was skipped, say that; when something is done and verified, state it plainly without hedging.
```

## State the boundaries

Claude Fable 5 can occasionally take unrequested actions (drafting an email when none was asked for, creating defensive git-branch backups). Define explicit constraints on what Claude Fable 5 should and should not do:

```text wrap
When the user is describing a problem, asking a question, or thinking out loud rather than requesting a change, the deliverable is your assessment. Report your findings and stop. Don't apply a fix until they ask for one. Before running a command that changes system state (restarts, deletes, config edits), check that the evidence actually supports that specific action. A signal that pattern-matches to a known failure may have a different cause.
```

## Parallel subagents

Claude Fable 5 dispatches parallel subagents more readily than prior models. Use subagents frequently, provide explicit guidance about when delegation is appropriate, and prefer asynchronous communication between orchestrator and subagents over blocking until each subagent returns. Long-lived subagents that keep their context across subtasks save time and cost through cache reads and avoid bottlenecking on the slowest subagent.

```text wrap
Delegate independent subtasks to subagents and keep working while they run. Intervene if a subagent goes off track or is missing relevant context.
```

## Construct a memory system

Claude Fable 5 performs particularly well when it can record lessons from previous runs and reference them. Provide a place to write notes, as simple as a Markdown file:

```text wrap
Store one lesson per file with a one-line summary at the top. Record corrections and confirmed approaches alike, including why they mattered. Don't save what the repo or chat history already records; update an existing note rather than creating a duplicate; delete notes that turn out to be wrong.
```

To bootstrap the memory system from existing history, have Claude Fable 5 review past sessions:

```text wrap
Reflect on the previous sessions we've had together. Use subagents to identify core themes and lessons, and store them in [X]. Make sure you know to reference [X] for future use.
```

## Rare cases of early stopping

Deep into a long session, Claude Fable 5 can occasionally end a turn with a text-only statement of intent ("I'll now run X") without issuing the corresponding tool call, or pause to ask permission when it already has enough to proceed. A "continue" or "go ahead and do it end to end" suffices. To define when pausing is appropriate, pair this with the checkpoint instruction in [Strong instruction following](#strong-instruction-following). For autonomous pipelines, add a system reminder:

```text wrap
You are operating autonomously. The user is not watching in real time and cannot answer questions mid-task, so asking "Want me to…?" or "Shall I…?" will block the work. For reversible actions that follow from the original request, proceed without asking. Offering follow-ups after the task is done is fine; asking permission after already discussing with the user before doing the work is not. Before ending your turn, check your last paragraph. If it is a plan, an analysis, a question, a list of next steps, or a promise about work you have not done ("I'll…", "let me know when…"), do that work now with tool calls. End your turn only when the task is complete or you are blocked on input only the user can provide.
```

## Rare cases of context-budget concern

In very long sessions, Claude Fable 5 can occasionally suggest a new session, offer to summarize and hand off, or trim its own work. This is most often triggered when the harness shows a remaining-token countdown to the model. Avoid surfacing explicit context-budget counts where possible. If the harness must show them, a reassurance helps:

```text wrap
You have ample context remaining. Do not stop, summarize, or suggest a new session on account of context limits. Continue the work.
```

## Give the reason, not only the request

Claude Fable 5 tends to perform better when it understands the intent behind a request: context lets it connect the task to relevant information rather than inferring intent on its own. Provide context about why you're asking, especially for long-running agents drawing on multiple workstreams:

```text wrap
I'm working on [the larger task] for [who it's for]. They need [what the output enables]. With that in mind: [request].
```

## Readability when communicating with the user

In extended or agentic conversations (many tool calls, large working context), Claude Fable 5 can produce text that's hard to follow: dense arrow-chain shorthand, deep implementation detail, references to thinking the user never saw, or overly technical phrasing. A communication-style addendum mitigates this:

```text wrap
Terse shorthand is fine between tool calls (that's you thinking out loud, and brevity there is good). Your final summary is different: it's for a reader who didn't see any of that.

If you've been working for a while without the user watching (overnight, across many tool calls, since they last spoke), your final message is their first look at any of it. Write it as a re-grounding, not a continuation of your working thread: the outcome first, then the one or two things you need from them, each explained as if new. The vocabulary you built up while working is yours, not theirs; leave it behind unless you re-introduce it.

When you write the summary at the end, drop the working shorthand. Write complete sentences. Spell out terms. Don't use arrow chains, hyphen-stacked compounds, or labels you made up earlier. When you mention files, commits, flags, or other identifiers, give each one its own plain-language clause. Open with the outcome: one sentence on what happened or what you found. Then the supporting detail. If you have to choose between short and clear, choose clear.
```

## Create a send-to-user tool

When running long, asynchronous agents, give the agent a way to surface a message the user must see exactly as written, without ending its turn: a deliverable (a generated code snippet or a drafted message), a progress update with specific numbers, or a direct reply to a question the user asked mid-loop. The tool's input is the message to display; when Claude calls it, render the input directly in your UI and return a simple acknowledgement as the tool result. Tool inputs are never summarized, so the content arrives intact.

```json
{
  "name": "send_to_user",
  "description": "Display a message directly to the user. Use this for progress updates, partial results, or content the user must see exactly as written before the task finishes.",
  "input_schema": {
    "type": "object",
    "properties": {
      "message": {
        "type": "string",
        "description": "The content to display to the user."
      }
    },
    "required": ["message"]
  }
}
```

Add this tool whenever your UX depends on delivering content or direct user interactions verbatim mid-task. For agents that only narrate routine progress, the model's own summaries are typically adequate. Defining the tool is not sufficient on its own; without an instruction in the system prompt, Claude Fable 5 rarely calls it. Pair the tool with elicitation language such as:

```text wrap
Between tool calls, when you have content the user must read verbatim (a partial deliverable, a direct answer to their question), call the send_to_user tool with that content. Use send_to_user only for user-facing content, not for narration or reasoning.
```

Do not route narration or internal reasoning through `send_to_user`; over-calling it for non-user-facing content defeats the purpose.

## Recommended scaffolding changes

* **Start at the top of your difficulty range.** Pick a task harder than what you'd assign to prior models, and have Claude Fable 5 scope it, ask clarifying questions, and execute.
* **Make self-verification explicit in long-run prompts.** Separate, fresh-context verifier subagents tend to outperform self-critique. For long-running tasks, instruct: `Establish a method for checking your own work at an interval of [X] as you build. Run this every [X interval], verifying your work with subagents against the specification.`
* **Refactor existing prompts and skills.** Skills developed for prior models are often too prescriptive for Claude Fable 5 and can degrade output quality. Review and consider removing older instructions if default performance is better. Claude Fable 5 also does a good job of updating skills on the fly based on what it learns from the task at hand.
* **Don't instruct Claude to reproduce its reasoning in the response.** Prompts, skills, or harness instructions that tell the model to echo, transcribe, or explain its internal reasoning as response text can trigger the [`reasoning_extraction` refusal category](/docs/en/build-with-claude/refusals-and-fallback#refusal-response) on Claude Fable 5, causing elevated fallbacks to Claude Opus 4.8. Audit existing skills and system prompts for reflection or show-your-thinking instructions when migrating. If your application needs reasoning visibility, read the structured `thinking` blocks from [adaptive thinking](/docs/en/build-with-claude/thinking) instead, and use a [send-to-user tool](#create-a-send-to-user-tool) to surface progress during long runs.
* **Create a send-to-user tool.** For long, asynchronous agents, a client-side tool delivers messages to the user verbatim without ending the turn. See [Create a send-to-user tool](#create-a-send-to-user-tool).

---

SOURCE: platform.claude.com docs — prompting-claude-opus-4-8

# Prompting Claude Opus 4.8

Behavioral differences and prompting patterns for Claude Opus 4.8, covering verbosity, effort calibration, tool use, subagents, and frontend defaults.

---

This guide covers the prompting patterns specific to Claude Opus 4.8. For the API changes involved in moving from Claude Opus 4.8 to the latest Opus model, see [Migrating to Claude Opus 5 from Claude Opus 4.8](/docs/en/about-claude/models/migration-guide#migrating-from-claude-opus-4-8-to-claude-opus-5). For techniques that apply across all current Claude models, see [Prompting best practices](/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices).

Claude Opus 4.8 has particular strengths in long-horizon agentic work, knowledge work, vision, and memory tasks. It performs well out of the box on existing Claude Opus 4.7 prompts. The following patterns cover the behaviors that most often require tuning.

<Note>
  For the API parameter changes since Claude Opus 4.7 (sampling parameters, effort default, 1M context window default, mid-conversation system messages, and refusal stop details), see [Migrating to Claude Opus 5 from Claude Opus 4.7](/docs/en/about-claude/models/migration-guide#migrating-from-claude-opus-47), which covers the same changes on the way to the latest Opus model; Claude Opus 4.8 shares these behaviors.
</Note>

## Response length and verbosity

Claude Opus 4.8 calibrates response length to how complex it judges the task to be, rather than defaulting to a fixed verbosity. This usually means shorter answers on simple lookups and much longer ones on open-ended analysis.

If your product depends on a certain style or verbosity of output, you may need to tune your prompts. As an example, to decrease verbosity, you might add:

```text wrap
Provide concise, focused responses. Skip non-essential context, and keep examples minimal.
```

If you see specific examples of kinds of verbosity (such as over-explaining), you can add additional instructions in your prompt to prevent them. Positive examples showing how Claude can communicate with the appropriate level of concision tend to be more effective than negative examples or instructions that tell the model what not to do.

## Calibrating effort and thinking depth

The [effort parameter](/docs/en/build-with-claude/effort) allows you to tune Claude's intelligence versus token spend, trading off capability for faster speed and lower costs. Start with the `xhigh` effort level for coding and agentic use cases, and use a minimum of `high` effort for most intelligence-sensitive use cases. Experiment with other effort levels to further tune token usage and intelligence:

* **`max`:** Max effort can deliver performance gains in some use cases, but may show diminishing returns from increased token usage. This setting can also sometimes be prone to overthinking. Test max effort for intelligence-demanding tasks.
* **`xhigh`:** Extra high effort is the best setting for most coding and agentic use cases.
* **`high`:** This setting balances token usage and intelligence. For most intelligence-sensitive use cases, use a minimum of `high` effort.
* **`medium`:** Good for cost-sensitive use cases that need to reduce token usage while trading off intelligence.
* **`low`:** Reserve for short, scoped tasks and latency-sensitive workloads that are not intelligence-sensitive.

Claude Opus 4.8 respects effort levels strictly, especially at the low end. At `low` and `medium`, the model scopes its work to what was asked rather than going above and beyond. This is good for latency and cost, but on moderately complex tasks running at `low` effort there is some risk of under-thinking.

If you observe shallow reasoning on complex problems, raise effort to `high` or `xhigh` rather than prompting around it. If you need to keep effort at `low` for latency, add targeted guidance:

```text wrap
This task involves multistep reasoning. Think carefully through the problem before responding.
```

Effort is likely to be more important for this model than for any prior Opus, so experiment with it actively when you upgrade.

On Claude Opus 4.8, thinking is off unless you explicitly set `thinking: {type: "adaptive"}`. The triggering behavior for adaptive thinking is steerable. If you find the model thinking more often than you'd like, which can happen with large or complex system prompts, add guidance to steer it. As always, measure the effect of any prompting changes on performance. Example:

```text wrap
Thinking adds latency and should only be used when it will meaningfully improve answer quality — typically for problems that require multistep reasoning. When in doubt, respond directly.
```

Conversely, if you're running hard workloads at `medium` and seeing under-thinking, the first lever is to raise effort. If you need finer control, prompt for it directly.

<Note>
  If you are running Claude Opus 4.8 at `max` or `xhigh` effort, set a large max output token budget so the model has room to think and act across its subagents and tool calls. Start at 64k tokens and tune from there.
</Note>

## Tool use triggering

Claude Opus 4.8 has a tendency to favor reasoning over tool calls. This produces better results in most cases. However, increasing the effort setting is a useful lever to increase the level of tool usage, especially in knowledge work. `high` or `xhigh` effort settings show substantially more tool usage in agentic search and coding. For scenarios where you want more tool use, you can also adjust your prompt to explicitly instruct the model about when and how to properly use its tools. For instance, if you find that the model is not using your web search tools, clearly describe why and how it should.

## User-facing progress updates

Claude Opus 4.8 provides more regular, higher-quality updates to the user throughout long agentic traces. If you've added scaffolding to force interim status messages ("After every 3 tool calls, summarize progress"), try removing it. If you find that the length or contents of Claude Opus 4.8's user-facing updates are not well-calibrated to your use case, explicitly describe what these updates should look like in the prompt and provide examples.

## More literal instruction following

Claude Opus 4.8 interprets prompts literally and explicitly, particularly at lower effort levels. It does not silently generalize an instruction from one item to another, and it does not infer requests you didn't make. The upside of this literalism is precision and less thrash, and it generally performs better for API use cases with carefully tuned prompts, structured extraction, and pipelines where you want predictable behavior. If you need Claude to apply an instruction broadly, state the scope explicitly (for example, "Apply this formatting to every section, not just the first one").

## Tone and writing style

As with any new model, prose style on long-form writing may shift. Claude Opus 4.8 tends toward a direct, opinionated style with minimal validation-forward phrasing and sparing emoji use. If your product relies on a specific voice, re-evaluate style prompts against the new baseline.

For instance, if your product voice is warmer or more conversational, add:

```text wrap
Use a warm, collaborative tone. Acknowledge the user's framing before answering.
```

## Controlling subagent spawning

Claude Opus 4.8 tends to spawn fewer subagents by default. However, this behavior is steerable through prompting; give Claude Opus 4.8 explicit guidance around when subagents are desirable. A toy example for a coding use case:

```text wrap
Do not spawn a subagent for work you can complete directly in a single response (e.g. refactoring a function you can already see).

Spawn multiple subagents in the same turn when fanning out across items or reading multiple files.
```

## Design and frontend defaults

Claude Opus 4.8 has strong design instincts, with a consistent default house style: warm cream/off-white backgrounds (\~`#F4F1EA`), serif display type (Georgia, Fraunces, Playfair), italic word-accents, and a terracotta/amber accent. This reads well for editorial, hospitality, and portfolio briefs, but will feel off for dashboards, dev tools, fintech, healthcare, or enterprise apps. The default appears in slide decks and web UIs.

This default is persistent. Generic instructions ("don't use cream," "make it clean and minimal") tend to shift the model to a different fixed palette rather than producing variety. Two approaches work reliably:

**1. Specify a concrete alternative.** The model follows explicit specs precisely:

```text wrap
Design a desktop landing page for a supplement brand called AEFRM.

The visual direction should come from a cold monochrome atmosphere using pale silver-gray tones that gradually deepen into blue-gray and near-black, similar to a misted metallic surface.

The page should feel sharp and controlled, with a strong sense of structure and restraint.

Use this tonal system across the full page instead of introducing bright accent colors.

Use the uploaded image on the hero design in black and white.

The layout should be built with clear horizontal sections and a centered max-width container. Use 4px corner radius consistently across cards, buttons, inputs, and media frames. Margins should feel generous, with enough empty space around each section so the page breathes.

Typography should use a square, angular sans-serif with wider letter spacing than usual, especially in headings and navigation, so the text feels more engineered and less compressed. Headline text can be large and uppercase, while supporting copy remains short and sparse. The sub texts should be written with Alumni Sans SC in 4-6px like tiny little texts on corners bottom centre like that.

For the structure, start with a hero section containing a strong product statement, one short supporting paragraph, and a clean product placeholder or packshot frame. Below that, add a benefit grid with three or four blocks, then a formulation or ingredients section, and finally a cta.

Buttons should be flat and precise, with subtle hover changes using transition: all 160ms ease out where brightness and border contrast shift slightly rather than using dramatic motion.

Color palette should stay within this range:
#E9ECEC, #C9D2D4, #8C9A9E, #44545B, #11171B.
```

**2. Have the model propose options before building.** This breaks the default and gives users control. If you previously relied on `temperature` for design variety, use this approach; it produces meaningfully different directions across runs. Example prompt:

```text wrap
Before building, propose 4 distinct visual directions tailored to this brief (each as: bg hex / accent hex / typeface — one-line rationale). Ask the user to pick one, then implement only that direction.
```

Additionally, Claude Opus 4.8 requires less frontend design prompting than previous models to avoid generic patterns that users call the "AI slop" aesthetic. With earlier models, Anthropic recommended a lengthier prompt snippet in the [frontend-design skill](https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md). However, Claude Opus 4.8 generates distinctive, creative frontends with more minimal prompting guidance. This prompt snippet works well with the preceding prompting advice for variety:

```text wrap
<frontend_aesthetics>
NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white or dark backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character. Use unique fonts, cohesive colors and themes, and animations for effects and micro-interactions.
</frontend_aesthetics>
```

## Interactive coding products

Claude Opus 4.8's token usage and behavior can differ between autonomous, asynchronous coding agents with a single user turn and interactive, synchronous coding agents with multiple user turns. Specifically, it tends to use more tokens in interactive settings, primarily because it reasons more after user turns. This can improve long-horizon coherence, instruction following, and coding capabilities in long, interactive coding sessions, but also comes with more token usage. To maximize both performance and token efficiency in coding products, use `xhigh` or `high` effort, add autonomous features like an auto mode, and reduce the number of human interactions required from your users.

Of course, when limiting the number of required user interactions, it's important to specify the task, intent, and relevant constraints upfront in the first human turn. Providing well-specified, clear, and accurate task descriptions upfront can help maximize autonomy and intelligence while minimizing extra token usage after user turns. Because Claude Opus 4.8 is more autonomous than prior models, this usage pattern helps to maximize performance. In contrast, ambiguous or underspecified prompts conveyed progressively over multiple user turns tend to relatively reduce token efficiency and sometimes performance.

## Code review harnesses

Claude Opus 4.8 is meaningfully better at finding bugs than prior models, and has both higher recall and precision in internal evals. However, if your code-review harness was tuned for an earlier model, you may initially see lower recall. This is likely a harness effect, not a capability regression. When a review prompt says things like "only report high-severity issues," "be conservative," or "don't nitpick," Claude Opus 4.8 may follow that instruction more faithfully than earlier models did: it may investigate the code just as thoroughly, identify the bugs, and then not report findings it judges to be below your stated bar. This can show up as the model doing the same depth of investigation but converting fewer investigations into reported findings, especially on lower-severity bugs. Precision typically rises, but measured recall can fall even though the model's underlying bug-finding ability has improved.

Some recommended prompt language:

```text wrap
Report every issue you find, including ones you are uncertain about or consider low-severity. Do not filter for importance or confidence at this stage - a separate verification step will do that. Your goal here is coverage: it is better to surface a finding that later gets filtered out than to silently drop a real bug. For each finding, include your confidence level and an estimated severity so a downstream filter can rank them.
```

This prompt can be used without having an actual second step, but moving confidence filtering out of the finding step often helps. If your harness has a separate verification, deduplication, or ranking stage, tell the model explicitly that its job at the finding stage is coverage rather than filtering.

If you do want the model to self-filter in a single pass, be concrete about where the bar is rather than using qualitative terms like "important": for example, "report any bugs that could cause incorrect behavior, a test failure, or a misleading result; only omit nits like pure style or naming preferences."

Iterate on prompts against a subset of your evals or test cases to validate recall or F1 score gains.

## Computer use

[Computer use](/docs/en/agents-and-tools/tool-use/computer-use-tool) capability works across resolutions, up to a maximum resolution of 2576px / 3.75MP. Internal computer use testing shows that sending images at 1080p provides a good balance of performance and cost.

For particularly cost-sensitive workloads, 720p or 1366×768 are lower-cost options with strong performance. Conduct your own testing to find the ideal settings for your use case; experimenting with effort settings can also help tune the model's behavior.

---

SOURCE: platform.claude.com docs — prompting-claude-opus-5

# Prompting Claude Opus 5

Behavioral differences and prompting patterns for Claude Opus 5, covering response verbosity, agentic narration, task scoping, subagent delegation, self-correction, and output artifacts when thinking is disabled.

---

This guide covers the prompting patterns specific to Claude Opus 5. For the model's capabilities and API changes, see [What's new in Claude Opus 5](/docs/en/about-claude/models/whats-new-opus-5). For techniques that apply across all current Claude models, see [Prompting best practices](/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices).

Claude Opus 5 is built for complex agentic coding and enterprise work, with particular strengths in long-horizon agentic tasks. It performs well out of the box on existing Claude Opus 4.8 prompts. The following patterns cover the behaviors that most often require tuning.

<Note>
  For API changes when migrating from Claude Opus 4.8 (thinking on by default, and disabling thinking capped at `high` effort), see the [migration guide](/docs/en/about-claude/models/migration-guide#migrating-from-claude-opus-4-8-to-claude-opus-5).
</Note>

## Capability improvements

Compared with Claude Opus 4.8, the improvements most relevant to prompting are:

* **Agentic coding:** Claude Opus 5 is strongest on difficult coding tasks: multi-file features, larger refactors, and end-to-end feature work. It completes full tasks rather than leaving stubs or placeholders, and it performs best when given the complete task specification up front and left to run. It also performs well on easier tasks like single-turn edits, where the difference from prior models is smaller.
* **Code review and bug-finding:** Claude Opus 5 reviews code with high precision and recall: it finds real bugs at a high rate per pass, and its additional findings are mostly real issues rather than false positives. Accuracy holds at lower effort settings, which supports a fast pass at review time and a more thorough pass later. If your review prompt says "only report high-severity issues" or "be conservative," the model may follow that instruction literally and report less; ask it to report everything and filter in a separate pass instead.
* **Efficiency at lower effort:** `low` and `medium` [effort](/docs/en/build-with-claude/effort) produce strong quality at a fraction of the tokens and latency of higher settings. Start with the default (`high`) and adjust based on your evals: use `low` and `medium` liberally as your primary control for token cost and response time wherever quality holds, and step up to `xhigh` for demanding coding and agentic work. If you carried effort defaults over from a prior model, re-run an effort sweep on your own evals. See [Effort](/docs/en/build-with-claude/effort#recommended-effort-levels-for-claude-opus-5) for the full recommendations.
* **Vision:** Claude Opus 5 is strong on chart, document, and diagram understanding, and on UI and frontend visual replication. Re-validate any prompt-side vision workarounds you tuned for prior models; they may no longer be needed. Vision performance is strongest when the model has tools to iteratively analyze, crop, and visually verify its work, and tool use is a more cost-effective lever than thinking alone.
* **Long-context work:** Claude Opus 5 has a [1M token context window](/docs/en/build-with-claude/context-windows) as both the default and the maximum, and its instruction following, tool calling, and reasoning stay consistent throughout the window.
* **Office and document tasks:** Claude Opus 5 generates and works with complex, multi-sheet spreadsheets with non-trivial formulas, and it produces well-structured slide decks. Prompt it with any specific styles or templates it needs to follow.
* **Multi-agent coordination:** Claude Opus 5 coordinates teams of subagents well, with effective writer-verifier patterns and few cases of agents overwriting each other's work. For cost-sensitive workloads, cap delegation; see [Controlling subagent spawning](#controlling-subagent-spawning).

## Response length and verbosity

Claude Opus 5's default user-facing responses run longer than prior Opus models'. The [effort parameter](/docs/en/build-with-claude/effort) controls how much the model [thinks](/docs/en/build-with-claude/thinking-steering-and-cost) rather than how much it says: lowering effort can reduce thinking volume without reliably shortening the visible response. To control response length, prompt for it explicitly.

A short conciseness instruction is effective. For example, for a user-facing multi-turn product:

```text wrap
Keep responses focused, brief, and concise. Keep disclaimers and caveats short, and spend most of the response on the main answer. When asked to explain something, give a high-level summary unless an in-depth explanation is specifically requested.
```

In a long system prompt, pair the instruction with a short reminder near the end of the prompt:

```text wrap
<tone_preference>
Keep outputs reasonably concise.
</tone_preference>
```

## User-facing progress updates

Claude Opus 5 narrates readily during agentic work: it tends to announce what it is about to do, and its per-message output in agentic sessions is often longer than prior models'. It benefits from explicit guidance on how to communicate with the user during a task. To tune narration down, describe the cadence and shape you want:

```text wrap
Before your first tool call, say in one sentence what you're about to do. While working, give a brief update only when you find something important or change direction. When you finish, lead with the outcome: your first sentence should answer "what happened" or "what did you find," with supporting detail after it for readers who want it.
```

To tune narration up, or change its style, the same lever applies in the other direction: explicitly describe what updates should look like and provide examples. Positive examples of the communication style you want tend to be more effective than instructions about what not to do.

## Written deliverable length

Separate from conversational verbosity, files that Claude Opus 5 writes to disk (reports, Markdown documents, summaries) are often longer than on prior models. If your product includes Claude-authored documents, add explicit length calibration:

```text wrap
Match the length of written documents to what the task needs: cover the substance, but do not pad with filler sections, redundant summaries, or boilerplate.
```

## Task scope and over-verification

Claude Opus 5 verifies its own work without being told to. If your prompt contains explicit verification instructions ("include a final verification step for any non-trivial task," "use a subagent to verify"), remove them: instructions like these cause over-verification on Claude Opus 5, and removing them reduces wasted tokens with no loss in quality. The same applies to legacy harness scaffolding that adds separate verification steps.

Claude Opus 5 can also expand the scope of a task, adding steps that weren't requested or applying its own judgment about what the task should be. For narrow tasks, constrain scope explicitly:

```text wrap
Deliver what was asked, at the scope intended. Make routine judgment calls yourself, and check in only when different readings of the request would lead to materially different work. If the request seems mistaken or a better approach exists, say so in a sentence and continue with the task as asked rather than quietly narrowing, widening, or transforming it. Finish the whole task, and stop short of actions that are clearly beyond what was asked.
```

## Controlling subagent spawning

Claude Opus 5 delegates to subagents more readily than prior models. Delegation pays off on genuinely independent, sizeable tracks of work, but it multiplies cost and time when applied to small tasks. If your harness supports subagents, give explicit guidance on which scenarios warrant delegation, or set deterministic caps on how many agents can be launched. For example:

```text wrap
Delegate to a subagent only for large tasks that are genuinely independent and parallelizable, such as a wide multi-file investigation. Do not delegate work you can finish yourself in a handful of tool calls, and do not use subagents to verify or double-check your own work. If one subagent can complete the task, use one rather than several, and keep spawn counts low.
```

## Self-correction

Claude Opus 5 catches and fixes its own mistakes well without prompting. Avoid instructing re-checks it already performs ("double-check your answer," "re-verify before responding"); like verification instructions, these compound with the model's own behavior and add cost without improving results.

The model also narrates corrections to its earlier statements more than prior models do, which can be undesirable in user-facing products. To limit correction narration to corrections that matter:

```text wrap
Only correct an earlier statement when the error would change the user's code, conclusions, or decisions. State corrections plainly and briefly, then continue the task. For slips that change nothing for the user, make the fix and move on without noting it.
```

## Running with thinking disabled

Claude Opus 5 runs with [thinking](/docs/en/build-with-claude/thinking) on by default, and thinking can be disabled only at [effort](/docs/en/build-with-claude/effort) `high` or below; see the [migration guide](/docs/en/about-claude/models/migration-guide#migrating-from-claude-opus-4-8-to-claude-opus-5). With thinking disabled, two artifacts can occasionally appear in the model's visible output. The primary mitigation for both is to keep thinking enabled and control token cost with lower effort levels instead of disabling thinking: for most tasks, thinking enabled at `low` effort performs better than thinking disabled at similar cost.

**Tool calls as text.** With thinking disabled, the model occasionally writes a tool call into its user-facing text instead of emitting a structured `tool_use` block. The turn completes normally and the call never runs, and in agentic loops the leaked text stays in the conversation history, so later turns are affected as well. This is most common on tool-heavy workloads such as search.

**Internal XML tags in output.** With thinking disabled, the model can emit `<thinking>` tags or other internal XML tags into its visible response. If your system prompt contains a rule instructing the model not to think or not to reason, remove it; that kind of instruction increases tag leakage.

For integrations that must keep thinking disabled, a single combined instruction mitigates both artifacts: it gives the model explicit permission to speak before a tool call, an alternative to forcing a call when no tool fits, and a general rule against internal tags:

```text wrap
When you use a tool, you may say a brief sentence first. If no tool can express what the user asked for, say so instead of guessing. Do not include internal or system XML tags in your response.
```

Instructions that call out thinking tags by name are less effective than the general form, so avoid naming them specifically.

---

SOURCE: platform.claude.com docs — prompting-claude-sonnet-5

# Prompting Claude Sonnet 5

Behavioral differences and prompting patterns for Claude Sonnet 5, covering effort, adaptive thinking defaults, tool use, and migration from Claude Sonnet 4.6.

---

This guide covers the prompting patterns specific to Claude Sonnet 5. For the model's capabilities and API changes, see [What's new in Claude Sonnet 5](/docs/en/about-claude/models/whats-new-sonnet-5). For techniques that apply across all current Claude models, see [Prompting best practices](/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices).

Claude Sonnet 5 has particular strengths in coding and agentic tasks. It performs well out of the box on existing Claude Sonnet 4.6 prompts. The patterns in this guide cover the behaviors that most often require tuning.

<Note>
  For API parameter changes when migrating from Claude Sonnet 4.6 (adaptive thinking on by default, sampling parameters not accepted, manual extended thinking removed, and the new tokenizer), see the [migration guide](/docs/en/about-claude/models/migration-guide#migrating-from-claude-sonnet-4-6-to-claude-sonnet-5).
</Note>

## Response length and verbosity

Claude Sonnet 5 calibrates response length to the complexity of the task rather than defaulting to a fixed verbosity. This usually means shorter answers on simple lookups and longer ones on open-ended analysis.

If your product depends on a certain style or verbosity of output, you may need to tune your prompts. As an example, to decrease verbosity, you might add:

```text wrap
Provide concise, focused responses. Skip non-essential context, and keep examples minimal.
```

If you see specific kinds of verbosity (such as over-explaining), you can add additional instructions in your prompt to prevent them. Positive examples showing how Claude can communicate with the appropriate level of concision tend to be more effective than negative examples or instructions that tell the model what not to do.

## Calibrating effort and thinking depth

The [effort parameter](/docs/en/build-with-claude/effort) allows you to tune Claude's intelligence versus token spend, trading off capability for faster speed and lower costs. On Claude Sonnet 5, effort defaults to `high`, the same as on Claude Sonnet 4.6. For the hardest coding and agentic tasks, raise effort to `xhigh`. Experiment with other effort levels to further tune token usage and intelligence:

* **`max`:** Absolute maximum capability with no constraints on token spending.
* **`xhigh`:** Extra high effort is the recommended setting for the hardest coding and agentic use cases.
* **`high`:** The default. This setting balances token usage and intelligence for most use cases.
* **`medium`:** Good for cost-sensitive use cases that need to reduce token usage while trading off intelligence.
* **`low`:** Reserve for short, scoped tasks and latency-sensitive workloads that are not intelligence-sensitive.

As a rough cross-model mapping when migrating: Claude Sonnet 5 at medium is comparable in intelligence to Claude Sonnet 4.6 at high, and Claude Sonnet 5 at high is comparable to Claude Sonnet 4.6 at max. When benchmarking, match by observed thinking length rather than effort name.

Claude Sonnet 5 respects effort levels strictly, especially at the low end. At `low` and `medium`, the model scopes its work to what was asked rather than going above and beyond. This is good for latency and cost, but on moderately complex tasks running at `low` effort there is some risk of under-thinking.

If you observe shallow reasoning on complex problems, raise effort to `high` or `xhigh` rather than prompting around it. If you need to keep effort at `low` for latency, add targeted guidance:

```text wrap
This task involves multistep reasoning. Think carefully through the problem before responding.
```

On Claude Sonnet 5, [adaptive thinking](/docs/en/build-with-claude/thinking) is on by default. Requests without a `thinking` field run with adaptive thinking. This is a change from Claude Sonnet 4.6, where the same requests ran without thinking. To turn thinking off entirely, pass `thinking: {type: "disabled"}`. Because `max_tokens` is a hard limit on total output (thinking plus response text), revisit it for workloads that ran without thinking on Claude Sonnet 4.6. If you were previously using thinking off with Claude Sonnet 4.6, try thinking on with lower effort levels for Claude Sonnet 5.

The triggering behavior for adaptive thinking is steerable. If you find the model emitting thinking blocks more often than you'd like, which can happen with large or complex system prompts, add guidance to steer it. As always, measure the effect of any prompting changes on performance. Example:

```text wrap
Thinking adds latency and should only be used when it will meaningfully improve answer quality, typically for problems that require multistep reasoning. When in doubt, respond directly.
```

Conversely, if you're running hard workloads at `medium` and seeing under-thinking, the first lever is to raise effort. If you need finer control, prompt for it directly.

Manual extended thinking (`thinking: {type: "enabled", budget_tokens: N}`) is not supported on Claude Sonnet 5 and returns a 400 error. It was deprecated on Claude Sonnet 4.6 and is now removed. Use adaptive thinking with the effort parameter instead.

<Note>
  If you are running Claude Sonnet 5 at `high`, `xhigh`, or `max` effort, leave headroom in `max_tokens` so the model has room for thinking and tool calls. On long tasks, adaptive thinking can use a large share of the budget; if the budget is tight, you may see a response that is almost entirely thinking followed by a truncated answer and `stop_reason: "max_tokens"`. Raising `max_tokens` or dropping to `medium` effort resolves this. Because Claude Sonnet 5 uses a [new tokenizer](/docs/en/about-claude/models/whats-new-sonnet-5#new-tokenizer) that produces approximately 30% more tokens for the same text, `max_tokens` limits tuned for Claude Sonnet 4.6 may truncate equivalent output. The exact increase depends on the content and workload shape.
</Note>

## Tool use triggering

Claude Sonnet 5 is more agentic than Claude Sonnet 4.6 by default and will reach for tools and run self-verification loops more readily. With thinking disabled, the model is less likely to reach for tools or consider searching; if you rely on tool calls with thinking off, add an explicit nudge in the system prompt. Effort is also a lever for tool usage: `high` or `xhigh` effort settings show substantially more tool usage in agentic search and coding. For scenarios where you want more tool use, you can also adjust your prompt to explicitly instruct the model about when and how to properly use its tools. For instance, if you find that the model is not using your web search tools, clearly describe why and how it should.

## User-facing progress updates

Claude Sonnet 5 provides regular, higher-quality updates to the user throughout long agentic traces. If you've added scaffolding to force interim status messages ("After every 3 tool calls, summarize progress"), try removing it. If you find that the length or contents of Claude Sonnet 5's user-facing updates are not well-calibrated to your use case, explicitly describe what these updates should look like in the prompt and provide examples.

## More literal instruction following

Claude Sonnet 5 interprets prompts literally and explicitly, particularly at lower effort levels. It does not silently generalize an instruction from one item to another, and it does not infer requests you didn't make. The upside of this literalism is precision, and it generally performs better for API use cases with carefully tuned prompts, structured extraction, and pipelines where you want predictable behavior. If you need Claude to apply an instruction broadly, state the scope explicitly (for example, "Apply this formatting to every section, not just the first one").

## Tone and writing style

As with any new model, prose style on long-form writing may shift. If your product relies on a specific voice, re-evaluate style prompts against the new baseline.

For instance, if your product voice is warmer or more conversational, add:

```text wrap
Use a warm, collaborative tone. Acknowledge the user's framing before answering.
```

If you previously relied on `temperature` for stylistic variety, note that setting `temperature`, `top_p`, or `top_k` to a non-default value returns a 400 error on Claude Sonnet 5. This constraint is new for Sonnet-class models. Remove these parameters when migrating, and use system-prompt instructions to guide tone and variety instead.

## Design and frontend defaults

Claude Sonnet 5 may settle into a consistent default visual style on open-ended frontend and design briefs. A default house style can read well for some briefs but feel off for dashboards, dev tools, fintech, healthcare, or enterprise apps.

Generic instructions ("don't use that color," "make it clean and minimal") tend to shift the model to a different fixed palette rather than producing variety. Two approaches work reliably:

**1. Specify a concrete alternative.** The model follows explicit specs precisely:

```text wrap
Design a desktop landing page for a supplement brand called AEFRM.

The visual direction should come from a cold monochrome atmosphere using pale silver-gray tones that gradually deepen into blue-gray and near-black, similar to a misted metallic surface.

The page should feel sharp and controlled, with a strong sense of structure and restraint.

Use this tonal system across the full page instead of introducing bright accent colors.

Use the uploaded image on the hero design in black and white.

The layout should be built with clear horizontal sections and a centered max-width container. Use 4px corner radius consistently across cards, buttons, inputs, and media frames. Margins should feel generous, with enough empty space around each section so the page breathes.

Typography should use a square, angular sans-serif with wider letter spacing than usual, especially in headings and navigation, so the text feels more engineered and less compressed. Headline text can be large and uppercase, while supporting copy remains short and sparse. The sub texts should be written with Alumni Sans SC in 4-6px like tiny little texts on corners bottom centre like that.

For the structure, start with a hero section containing a strong product statement, one short supporting paragraph, and a clean product placeholder or packshot frame. Below that, add a benefit grid with three or four blocks, then a formulation or ingredients section, and finally a cta.

Buttons should be flat and precise, with subtle hover changes using transition: all 160ms ease out where brightness and border contrast shift slightly rather than using dramatic motion.

Color palette should stay within this range:
#E9ECEC, #C9D2D4, #8C9A9E, #44545B, #11171B.
```

**2. Have the model propose options before building.** This breaks the default and gives users control. Because `temperature` is not accepted on Claude Sonnet 5, this approach is the recommended way to produce meaningfully different design directions across runs. Example prompt:

```text wrap
Before building, propose 4 distinct visual directions tailored to this brief (each as: bg hex / accent hex / typeface, plus a one-line rationale). Ask the user to pick one, then implement only that direction.
```

To steer away from generic patterns that users call the "AI slop" aesthetic, you can include a short directive in your system prompt. The [frontend-design skill](https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md) provides a fuller treatment, but this snippet works well alongside the preceding variety approaches:

```text wrap
<frontend_aesthetics>
NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white or dark backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character. Use unique fonts, cohesive colors and themes, and animations for effects and micro-interactions.
</frontend_aesthetics>
```

## Interactive coding products

Token usage and behavior can differ between autonomous, asynchronous coding agents with a single user turn and interactive, synchronous coding agents with multiple user turns. To maximize both performance and token efficiency in coding products, use `xhigh` or `high` effort, add autonomous features like an auto mode, and reduce the number of human interactions required from your users.

When limiting the number of required user interactions, it's important to specify the task, intent, and relevant constraints upfront in the first human turn. Providing well-specified, clear, and accurate task descriptions upfront can help maximize autonomy and intelligence while minimizing extra token usage after user turns. In contrast, ambiguous or underspecified prompts conveyed progressively over multiple user turns tend to relatively reduce token efficiency and sometimes performance.

## Code review harnesses

If your code-review harness was tuned for an earlier model, you may initially see lower recall on Claude Sonnet 5. This is likely a harness effect, not a capability regression. When a review prompt says things like "only report high-severity issues," "be conservative," or "don't nitpick," Claude Sonnet 5 may follow that instruction more faithfully than earlier models did: it may investigate the code just as thoroughly, identify the bugs, and then not report findings it judges to be below your stated bar. This can show up as the model doing the same depth of investigation but converting fewer investigations into reported findings, especially on lower-severity bugs. Precision typically rises, but measured recall can fall even though the model's underlying bug-finding ability has improved.

Some recommended prompt language:

```text wrap
Report every issue you find, including ones you are uncertain about or consider low-severity. Do not filter for importance or confidence at this stage - a separate verification step will do that. Your goal here is coverage: it is better to surface a finding that later gets filtered out than to silently drop a real bug. For each finding, include your confidence level and an estimated severity so a downstream filter can rank them.
```

This prompt can be used without having an actual second step, but moving confidence filtering out of the finding step often helps. If your harness has a separate verification, deduplication, or ranking stage, tell the model explicitly that its job at the finding stage is coverage rather than filtering.

If you do want the model to self-filter in a single pass, be concrete about where the bar is rather than using qualitative terms like "important": for example, "report any bugs that could cause incorrect behavior, a test failure, or a misleading result; only omit nits like pure style or naming preferences."

Iterate on prompts against a subset of your evals or test cases to validate recall or F1 score gains.

## Computer use

Claude Sonnet 5 supports the `computer_20251124` tool version. [Computer use](/docs/en/agents-and-tools/tool-use/computer-use-tool) capability works across resolutions, up to a maximum resolution of 2576px / 3.75MP. Internal computer use testing shows that sending images at 1080p provides a good balance of performance and cost.

For particularly cost-sensitive workloads, 720p or 1366×768 are lower-cost options with strong performance. Conduct your own testing to find the ideal settings for your use case; experimenting with effort settings can also help tune the model's behavior.
